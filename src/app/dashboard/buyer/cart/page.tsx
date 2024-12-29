"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  removeProduct,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
  updateQuantity,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Product as PrismaProduct } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

interface Product extends PrismaProduct {
  variant: string;
  quantity: number;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CartPage() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const itemsCount = useAppSelector(selectCartItemsCount);
  const { toast } = useToast();

  const handleRemoveItem = (id: string) => {
    dispatch(removeProduct(id));
    toast({
      title: "Product removed",
      description: "Product has been removed from cart",
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = async () => {
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
        products: cartItems,
      }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Cart ({itemsCount})</h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {cartItems.map((item: Product) => (
                <div key={item.id} className="space-y-3 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative aspect-square h-24 w-24 min-w-fit overflow-hidden rounded">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="absolute object-cover"
                        />
                      </div>
                      <div className="flex flex-col self-start">
                        <span className="line-clamp-1 text-lg font-medium my-1">
                          {item.name}
                        </span>
                        <span className="line-clamp-1 text-sm">
                          ${item.price}
                        </span>
                        <span className="line-clamp-1 text-sm text-muted-foreground my-1">
                          <div className="flex items-center space-x-4">
                            <span>Variant: {item.variant}</span>
                          </div>
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-none"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-sm font-bold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button className="w-full mt-6" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 min-h-[60vh]">
          <ShoppingCart
            className="h-24 w-24 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-xl font-medium text-muted-foreground">
            Your cart is empty
          </span>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
