import { ChevronRightIcon } from "@heroicons/react/20/solid";

const steps = [
  { name: "Cart", href: "/dashboard/cart", status: "complete" },
  {
    name: "Cheakout Information",
    href: "/dashboard/cart/checkout",
    status: "current",
  },
  {
    name: "Order Confirmation",
    href: "/dashboard/cart/order",
    status: "upcoming",
  },
];

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="relative border-b border-gray-200 bg-white text-sm font-medium text-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative flex justify-end sm:justify-center">
            <nav aria-label="Progress" className="hidden sm:block">
              <ol role="list" className="flex space-x-4">
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className="flex items-center">
                    {step.status === "current" ? (
                      <a
                        href={step.href}
                        aria-current="page"
                        className="text-indigo-600"
                      >
                        {step.name}
                      </a>
                    ) : (
                      <a href={step.href}>{step.name}</a>
                    )}

                    {stepIdx !== steps.length - 1 ? (
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="ml-4 h-5 w-5 text-gray-300"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="sm:hidden">Step 2 of 4</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-12 sm:py-16 lg:py-20">
          {children}
        </div>
      </main>
    </div>
  );
}
