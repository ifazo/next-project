"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const productFormSchema = z.object({
  name: z.string().min(4, "Product name must be at least 4 characters."),
  categoryName: z.string({
    required_error: "Please select a category.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a valid positive number.",
  }),
  images: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .png, and .webp formats are supported."
          )
          .optional(),
      })
    )
    .length(5),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  specifications: z.array(z.string()).length(6),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a valid non-negative number.",
  }),
  shopName: z.string().min(2, "Shop name must be at least 2 characters."),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function CreateProductForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      categoryName: "",
      price: "",
      images: Array(5).fill({ file: undefined }),
      description: "",
      specifications: Array(6).fill(""),
      stock: "",
      shopName: "",
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true);
    // console.log(data);
    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Product Created",
        description: `Product "${data.name}" has been successfully created.`,
      });
      form.reset();
    }, 2000);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
        <CardDescription>
          Add a new product to your online store.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="toys">Toys & Games</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter stock quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormLabel>Product Images</FormLabel>
              <div className="grid grid-cols-5 gap-4 mt-2">
                {form.watch("images").map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`images.${index}.file`}
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onChange(file);
                                }
                              }}
                              {...field}
                              className="hidden"
                              id={`image-${index}`}
                            />
                            <label
                              htmlFor={`image-${index}`}
                              className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:border-gray-400 transition-colors"
                            >
                              {value ? (
                                <Image
                                  width={200}
                                  height={200}
                                  src={URL.createObjectURL(value)}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              ) : (
                                <Plus className="w-6 h-6 text-gray-400" />
                              )}
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormDescription className="mt-2">
                Upload up to 5 images. Accepted formats: JPG, PNG, WebP. Max
                size: 5MB per image.
              </FormDescription>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Specifications</FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {form.watch("specifications").map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`specifications.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={`Specification ${index + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Product..." : "Create Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
