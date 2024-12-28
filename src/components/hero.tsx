"use client";

import { ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Hero = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              New Arrives
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              ifaz.next is your best e-commerce solution. We provide the best
              quality services for you. Seller and buyer can easily interact
              with each other. We have a lot of features that will help you to
              grow your business.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Link href="/products">
                <Button className="w-full sm:w-auto px-16">
                  Shop now
                  <ArrowDownRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/shops">
                <Button variant="outline" className="w-full sm:w-auto px-16">
                  Sell now
                  <ArrowDownRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>
            <DotLottieReact
              src="https://lottie.host/455b7446-4b29-4f33-8586-4c69360ac671/WUZOW36RTf.lottie"
              loop
              autoplay
            />
        </div>
      </div>
    </section>
  );
};

export default Hero;
