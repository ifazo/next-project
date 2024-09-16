import { Package2, Twitter, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="border-t bg-background py-10">
            <div className="container mx-auto flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 md:space-x-8">
                {/* Logo and description */}
                <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <Link href="#" className="flex items-center gap-2">
                        <Package2 className="h-6 w-6" />
                        <span className="text-lg font-semibold">Acme Inc</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Beautifully designed components built with Radix UI and Tailwind CSS.
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col items-center space-y-4 text-center md:flex-row md:space-y-0 md:space-x-6">
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                        Contact
                    </Link>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                        Terms of Service
                    </Link>
                </nav>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-5 w-5 text-muted-foreground hover:text-blue-500" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5 text-muted-foreground hover:text-gray-800" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-blue-700" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Copyright Text */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Acme Inc. All rights reserved.
            </div>
        </footer>
    )
}
