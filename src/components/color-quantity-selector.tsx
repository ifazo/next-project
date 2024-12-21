"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Product } from "@prisma/client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
) as Promise<Stripe>;

export default function ColorQuantitySelector({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("black");

  const totalPrice = product.price * quantity;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handlePayment = async () => {
    const stripe = (await stripePromise) as Stripe;
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
        products: [{ ...product, quantity, color }],
      }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Color Selector */}
        <div>
          <Label htmlFor="color">Color</Label>
          <RadioGroup
            id="color"
            defaultValue="black"
            className="flex gap-2 mt-2"
            onValueChange={(value) => setColor(value)}
          >
            {["black", "white", "brown"].map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <RadioGroupItem value={color} id={color} />
                <Label htmlFor={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Label>
              </div>
            ))}
          </RadioGroup>
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
            Buy now ${totalPrice.toFixed(2)}
          </Button>
          <Button variant="outline" className="w-full">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
