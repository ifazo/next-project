"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadStripe } from "@stripe/stripe-js";
import { Product } from "@prisma/client";
import { useAppDispatch } from "@/store/hook";
import { addProduct } from "@/store/features/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function VariantQuantitySelector({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(product.variants[0]);

  const { data: session } = useSession();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const totalPrice = product.price * quantity;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity, variant }));
    toast({
      title: "Success",
      description: "Product added to cart",
    });
  };

  const handlePayment = async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "You need to be logged in to checkout",
        variant: "destructive",
      });
      redirect("/sign-in");
    }
    toast({
      title: "Checking out",
      description: "Redirecting to checkout...",
    });
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Failed to load Stripe");
      return;
    }
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [{ ...product, quantity, variant }],
        email: session?.user?.email,
      }),
    });
    const paymentSession = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: paymentSession.id });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Variant Selector */}
        <div>
          <Label htmlFor="variant">Variant</Label>
          <div className="flex gap-2 mt-2">
            {product.variants.map((variantOption) => (
              <Button
                key={variantOption}
                variant="outline"
                className={`px-4 py-2 ${
                  variant === variantOption
                    ? "ring-2 ring-primary"
                    : "ring-2 ring-transparent"
                }`}
                onClick={() => setVariant(variantOption)}
              >
                {variantOption.charAt(0).toUpperCase() + variantOption.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <div className="flex items-center mt-2">
            <Button
              onClick={decreaseQuantity}
              variant="outline"
              size="icon"
              className="font-bold"
            >
              -
            </Button>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              className="w-20 text-center mx-2 font-bold"
              readOnly
            />
            <Button
              onClick={increaseQuantity}
              variant="outline"
              size="icon"
              className="font-bold"
            >
              +
            </Button>
          </div>
        </div>
        {/* Buy now and Add to cart buttons */}
        <div className="flex space-x-4">
          <Button onClick={handlePayment} className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Buy now ${totalPrice.toFixed(2)}
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="w-full"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
