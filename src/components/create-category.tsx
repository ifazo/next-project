"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(6, "Name must be at least 6 characters"),
  slug: z.string().min(6, "Slug must be at least 6 characters"),
  image: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, { message: "Image is required." }),
  details: z.string().min(20, "Description must be at least 20 characters"),
});

export function CreateCategory() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      image: undefined,
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          slug: values.slug,
          image: imageUrl,
          details: values.details,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create shop");
      }

      toast({
        title: "Success",
        description: "Your shop has been created.",
      });
    } catch (error) {
      console.error("Failed to create shop", error);
      toast({
        title: "Error",
        description: "There was a problem creating your shop.",
        variant: "destructive",
      });
      form.reset()
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                        placeholder="/slug"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Category details"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Category</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
