import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

// Data for categories with images and product counts
const categories = [
  {
    title: "Technology",
    description: "Explore the latest tech trends.",
    link: "/categories/technology",
    imageUrl: "/img/logo.png",
    productCount: 120,
  },
  {
    title: "Fashion",
    description: "Discover new styles and trends.",
    link: "/categories/fashion",
    imageUrl: "/img/logo.png",
    productCount: 85,
  },
  {
    title: "Health",
    description: "Stay informed on health topics.",
    link: "/categories/health",
    imageUrl: "/img/logo.png",
    productCount: 60,
  },
  {
    title: "Travel",
    description: "Find amazing travel destinations.",
    link: "/categories/travel",
    imageUrl: "/img/logo.png",
    productCount: 45,
  },
]

const CategoriesOverview = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Explore Our Categories</h2>
          <p className="text-muted-foreground mt-2">Check out popular categories or view them all.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link href={category.link} key={index}>
              <Card className="relative cursor-pointer hover:shadow-lg transition">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-lg"
                  style={{
                    backgroundImage: `url(${category.imageUrl})`,
                    filter: "brightness(0.7)", // Darken the background for better readability
                  }}
                ></div>

                {/* Card Content */}
                <div className="relative z-10 p-6 text-white">
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                    {/* Product Count */}
                    <div className="mt-4 text-sm font-semibold">
                      {category.productCount} products available
                    </div>
                  </CardHeader>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/categories" className="text-primary font-semibold">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategoriesOverview
