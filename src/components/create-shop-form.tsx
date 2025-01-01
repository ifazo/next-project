"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Shop name must be at least 4 characters.",
  }),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "Image is required." }),
  details: z.string().min(10, {
    message: "Shop details must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
});

export function CreateShopForm({
  email,
  role,
}: {
  email: string;
  role: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
      details: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!email) {
      toast({
        title: "Error",
        description: "You must be logged in to create a shop.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = "";

      if (values.image && values.image[0]) {
        const formData = new FormData();
        formData.append("image", values.image[0]);

        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const imgbbResult = await imgbbResponse.json();

        if (!imgbbResponse.ok || !imgbbResult.success) {
          throw new Error("Failed to upload image to imgbb");
        }

        imageUrl = imgbbResult.data.display_url;
      }

      const response = await fetch("/api/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role,
        },
        body: JSON.stringify({
          name: values.name,
          details: values.details,
          address: values.address,
          sellerEmail: email,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create shop");
      }

      toast({
        title: "Success",
        description: "Your shop has been created.",
      });
      router.push("/dashboard/seller/shop");
    } catch (error) {
      console.error("Failed to create shop", error);
      toast({
        title: "Error",
        description: "There was a problem creating your shop.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Name</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Shop" {...field} />
              </FormControl>
              <FormDescription>This is your public shop name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      field.onChange(files);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>Upload an image for your shop.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your shop..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide some details about your shop.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City, Country" {...field} />
              </FormControl>
              <FormDescription>
                Enter the physical address of your shop.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Shop"}
        </Button>
      </form>
    </Form>
  );
}
