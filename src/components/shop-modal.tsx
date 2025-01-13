"use client";

import Image from "next/image";
import { Calendar, Mail, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Shop } from "@prisma/client";

interface ShopModalProps {
  shop: Shop | null;
  onClose: () => void;
}

export function ShopModal({ shop, onClose }: ShopModalProps) {
  const { toast } = useToast();

  async function handleStatusToggle() {
    if (!shop) return;
    try {
      // Here you would typically make an API call to update the shop's status
      const newStatus = shop.status === "active" ? "suspended" : "active";
      toast({
        title: "Status Updated",
        description: `${shop.name} has been ${newStatus.toLowerCase()}.`,
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

  if (!shop) return null;

  return (
    <Dialog open={!!shop} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{shop.name}</span>
            <Badge variant={shop.status === "active" ? "default" : "secondary"}>
              {shop.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={shop.image}
              alt={shop.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid gap-4">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {shop.details}
              </p>
            </div>
            <Separator />
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                {shop.address}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                {shop.sellerEmail}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                Joined {new Date(shop.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant={shop.status === "active" ? "destructive" : "default"}
              onClick={handleStatusToggle}
            >
              {shop.status === "active" ? "Suspend Shop" : "Activate Shop"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
