"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type Inputs = {
  name: string;
  role: "buyer" | "seller";
  email: string;
  password: string;
  image: FileList;
};

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let imageUrl = "";

      toast({
        title: "Loading",
        description: "Creating your account",
      });

      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

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

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          role: data.role,
          email: data.email,
          password: data.password,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      await response.json();

      toast({
        title: "Success",
        description: `Sign up with ${data.email}`,
      });

      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred",
      });
    }
  };

  const selectedRole = watch("role");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex w-full items-center justify-center m-8">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Buyer Radio Button */}
            <label
              htmlFor="buyer"
              className={`flex items-center justify-center p-1 border rounded-lg cursor-pointer ${
                selectedRole === "buyer" ? "bg-gray-900 text-white" : "bg-white"
              }`}
            >
              <input
                {...register("role", { required: true })}
                type="radio"
                value="buyer"
                id="buyer"
                className="hidden"
              />
              Buyer
            </label>

            <label
              htmlFor="seller"
              className={`flex items-center justify-center p-1 border rounded-lg cursor-pointer ${
                selectedRole === "seller"
                  ? "bg-gray-900 text-white"
                  : "bg-white"
              }`}
            >
              <input
                {...register("role", { required: true })}
                type="radio"
                value="seller"
                id="seller"
                className="hidden"
              />
              Seller
            </label>
          </div>
          {errors.role && (
            <span className="text-red-500">Please select a role</span>
          )}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Select account type
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              {imagePreview && (
                <div className="flex justify-center items-center mt-2">
                  <Image
                    src={imagePreview}
                    alt="Profile picture preview"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <Label htmlFor="image">Profile</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                {...register("name", { required: true })}
              />
              {errors.name && <span>Name is required</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}
            </div>
            <div className="grid gap-2">
              <Button className="w-full">Create account</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary mx-2">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
