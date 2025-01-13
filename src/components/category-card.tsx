"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@prisma/client";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { toast } = useToast();

  async function handleStatusToggle() {
    try {
      // Here you would typically make an API call to update the category status
      const newStatus = category.status === "active" ? "suspend" : "active";
      toast({
        title: "Status Updated",
        description: `${category.name} has been ${newStatus.toLowerCase()}.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update category status.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="aspect-[4/3] relative">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover rounded-t-lg"
          />
          <Badge
            variant={category.status === "active" ? "secondary" : "destructive"}
            className="absolute top-2 right-2"
          >
            {category.status.toLowerCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{category.name}</h3>
        <p className="text-sm text-muted-foreground">{category.details.slice(0, 50)}...</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="h-4 w-4 mr-1" />
          {/* {category.productsCount} products */}
          3 products
        </div>
        <Button
          variant={category.status === "active" ? "destructive" : "default"}
          size="sm"
          onClick={handleStatusToggle}
        >
          {category.status === "active" ? "Deactivate" : "Activate"}
        </Button>
      </CardFooter>
    </Card>
  );
}
