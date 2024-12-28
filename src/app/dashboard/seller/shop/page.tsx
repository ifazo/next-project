import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, MapPin, Store } from "lucide-react";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function SellerShopPage() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const email = session?.user?.email;

  const shopRes = await fetch(
    `${process.env.BASE_URL}/api/shops?sellerEmail=${email}`,
    {
      cache: "no-cache",
    }
  );
  const shop = await shopRes.json();

  if (!shop) {
    notFound();
  }

  return (
    <div>
      <Card className="lg:col-span-2">
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={shop.image}
              alt={shop.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl mb-2">{shop.name}</CardTitle>
              <p className="text-muted-foreground">{shop.details}</p>
            </div>
            <Badge variant="secondary" className="text-lg py-1">
              <Store className="h-5 w-5 mr-2" />
              Shop
            </Badge>
          </div>
          <Separator className="my-6" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{shop.sellerEmail}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>
                Joined {new Date(shop.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
