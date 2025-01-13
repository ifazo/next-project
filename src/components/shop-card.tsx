"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shop } from "@prisma/client";
import { Eye } from "lucide-react";

interface ShopCardProps {
  shop: Shop;
  onSelect: () => void;
}

export function ShopCard({ shop, onSelect }: ShopCardProps) {
  const { toast } = useToast();

  async function handleStatusToggle(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      // Here you would typically make an API call to update the shop's status
      const newStatus = shop.status === "active" ? "suspended" : "active";
      toast({
        title: "Status Updated",
        description: `${shop.name} has been ${newStatus}.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update shop status.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={onSelect}
    >
      <CardHeader className="p-0 relative">
        <Eye className="h-5 w-5 absolute top-2 right-2 z-10" />
        <div className="aspect-square relative">
          <Image
            src={shop.image}
            alt={shop.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold truncate">{shop.name}</h3>
          <Button
            variant={shop.status === "suspended" ? "default" : "destructive"}
            size="sm"
            onClick={handleStatusToggle}
            className="ml-2"
          >
            {shop.status === "suspended" ? "Activate" : "Suspend"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
