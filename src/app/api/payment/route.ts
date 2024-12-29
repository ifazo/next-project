import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(`${process.env.BASE_URL}/sign-in`);
  }
  const email = session?.user?.email as string;
  try {
    const { products } = await req.json();
    const customer = await stripe.customers.create({
      email,
    });
    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.images[0]],
          description: `Variant: ${product.variant}`,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    if (!stripeSession) {
      return NextResponse.json(
        { error: "Failed to create payment session" },
        { status: 500 }
      );
    }

    const filteredProducts = products.map((product) => ({
      productId: product.id,
      name: product.name,
      price: product.price,
      variant: product.variant,
      quantity: product.quantity,
      image: product.images[0],
      shopName: product.shopName,
      categorySlug: product.categorySlug,
    }));

    await prisma.order.create({
      data: {
        paymentId: stripeSession.id,
        status: "pending",
        userEmail: email,
        products: {
          create: filteredProducts,
        },
        totalAmount: products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        ),
      },
    });
    return NextResponse.json({ id: stripeSession.id });
  } catch (error) {
    console.error("Stripe payment error:", error);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}
