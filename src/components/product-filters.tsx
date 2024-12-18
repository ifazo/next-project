"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ProductFilters() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-8" />
      </div>
    </div>
  );
}
