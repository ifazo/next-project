import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-6">
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                Ready to get started?
            </h3>
            <p className="text-muted-foreground lg:text-lg">
                Start your journey with us today and see how you can build a better business.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outline">
                <Link href='/sign-in'>Log In</Link>
            </Button>
            <Button>
                <Link href='/sign-up'>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
