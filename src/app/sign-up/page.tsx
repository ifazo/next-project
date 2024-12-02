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
import bcrypt from "bcryptjs";

type Inputs = {
  name: string;
  role: "buyer" | "seller";
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, role, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role, email, password: hashedPassword }),
    });
    const result = await response.json();

    if (!result) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create user",
      });
    } else {
      toast({
        title: "Success",
        description: `Sign up with ${email}`,
      });
      router.push("/sign-in");
    }
  };

  const selectedRole = watch("role");

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
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
                className="hidden" // Hide the actual input
              />
              Buyer
            </label>

            {/* Seller Radio Button */}
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
                className="hidden" // Hide the actual input
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="Full name"
                {...register("name", { required: true })}
              />
              {errors.name && <span>Name is required</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@example.com"
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
