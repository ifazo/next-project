"use client"

import { Check, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const categories = [
  { value: "all", label: "All" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "footwear", label: "Footwear" },
  { value: "jewelry", label: "Jewelry" },
]

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
]

export function ProductFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              <PlusCircle className="mr-2 h-4 w-4" />
              Category
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Filter categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    onSelect={() => {
                      // Handle category selection
                    }}
                  >
                    <Check
                      className="mr-2 h-4 w-4 opacity-0 data-[selected=true]:opacity-100"
                      data-selected={category.value === "all"}
                    />
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" className="h-8" />
        <div className="flex flex-wrap gap-2">
          {["In Stock", "On Sale"].map((filter) => (
            <Badge key={filter} variant="secondary" className="rounded-full">
              {filter}
            </Badge>
          ))}
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            Sort by
            <Check className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="end">
          <Command>
            <CommandGroup>
              {sortOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    // Handle sort selection
                  }}
                >
                  <Check
                    className="mr-2 h-4 w-4 opacity-0 data-[selected=true]:opacity-100"
                    data-selected={option.value === "newest"}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

