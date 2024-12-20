'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ColorQuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
  onColorChange: (color: string) => void;
}

export default function ColorQuantitySelector({
  onQuantityChange,
  onColorChange,
}: ColorQuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        onQuantityChange(newQuantity);
        return newQuantity;
      }
      return prev;
    });
  };

  return (
    <div className="space-y-4">
      {/* Color Selector */}
      <div>
        <Label htmlFor="color">Color</Label>
        <RadioGroup
          id="color"
          defaultValue="black"
          className="flex gap-2 mt-2"
          onValueChange={(color) => onColorChange(color)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="black" id="black" />
            <Label htmlFor="black">Black</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="white" id="white" />
            <Label htmlFor="white">White</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="brown" id="brown" />
            <Label htmlFor="brown">Brown</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Quantity Selector */}
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <div className="flex items-center mt-2">
          <Button onClick={decreaseQuantity} variant="outline" size="icon">
            -
          </Button>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            className="w-20 text-center mx-2"
            readOnly
          />
          <Button onClick={increaseQuantity} variant="outline" size="icon">
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
