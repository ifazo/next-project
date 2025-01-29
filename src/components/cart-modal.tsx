"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  removeProduct,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Product as PrismaProduct } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Product extends PrismaProduct {
  variant: string;
  quantity: number;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export function CartModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const itemsCount = useAppSelector(selectCartItemsCount);

  const handleRemoveItem = (id: string) => {
    dispatch(removeProduct(id));
    toast({
      title: "Product removed",
      description: "Product has been removed from cart",
    });
  };

  const handleCheckout = async () => {
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
    const paymentSession = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: paymentSession.id });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {itemsCount > 0 && (
            <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {itemsCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cart ({itemsCount})</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-6">
              {cartItems.map((item: Product) => (
                <div key={item.id} className="space-y-3 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="absolute object-cover"
                        />
                      </div>
                      <div className="flex flex-col self-start">
                        <span className="line-clamp-1 text-sm font-medium mb-1">
                          {item.name}
                        </span>
                        <span className="line-clamp-1 text-sm">
                          ${item.price}
                        </span>
                        <span className="line-clamp-1 text-sm text-muted-foreground mb-1">
                          <div className="flex items-center space-x-4">
                            <span>Variant: {item.variant}</span>
                            <span>Quantity: {item.quantity}</span>
                          </div>
                        </span>
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
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total</span>
                  <span className="text-sm font-bold">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingCart
              className="h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              Your cart is empty
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
