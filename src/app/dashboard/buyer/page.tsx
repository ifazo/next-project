import { Timer, Zap, ZoomIn } from "lucide-react";
import Link from "next/link";

export default function BuyerDashboardPage() {
  return (
    <section>
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          Buyer Dashboard
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">See the details</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Link href="/dashboard/overview" className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Timer className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Overview</h3>
            <p className="leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
              doloremque! Eligendi.
            </p>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="rounded-lg bg-accent p-5"
          >
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ZoomIn className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Analytics</h3>
            <p className="leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
              doloremque! Eligendi.
            </p>
          </Link>
          <Link href="/dashboard/reports" className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Reports</h3>
            <p className="leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
              doloremque! Eligendi.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
