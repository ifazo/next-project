import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Stripe secret key is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req: NextRequest) {
  try {
    const { products } = await req.json();

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.images[0]],
          description: `Variant: ${product.variant}`,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Stripe payment error:', error);
    return NextResponse.json({ error: 'Failed to create payment session' }, { status: 500 });
  }
}
