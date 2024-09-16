import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
    return (
        <section className="relative h-[500px] w-full">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
                <Image
                    src="/img/hero-bg.jpg"
                    alt="Hero background"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                    className="brightness-75" // Darkens the image for better text readability
                />
            </div>

            {/* Hero Content */}
            <div className="flex h-full flex-col items-center justify-center text-center text-white space-y-6">
                <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                    Welcome to Acme Inc
                </h1>
                <p className="max-w-lg text-lg sm:text-xl">
                    Build your next project with beautifully designed components using Radix UI and Tailwind CSS.
                </p>
                <Button size="lg" variant="default" className="bg-primary hover:bg-primary-dark">
                    Get Started
                </Button>
            </div>
        </section>
    )
}
