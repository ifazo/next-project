"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import supabase from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type Inputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const { email, password } = data;
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(user);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: `Sign in with ${email}`,
      });
    }
  };
  console.log(watch("password")); // watch input value by passing the name of it

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/",
      },
    });
    console.log(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "Sign in with Google",
      });
    }
  };

  const handleGitHubSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "/",
      },
    });
    console.log(data);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "Sign in with GitHub",
      });
    }
  };

  return (
    <Card className="mx-auto my-8 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                placeholder="mail@example.com"
                type="email"
              />
              {errors.email && <span>Email field is required</span>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forget"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forget your password?
                </Link>
              </div>
              <Input
                {...register("password", { required: true })}
                type="password"
              />
              {errors.password && <span>Password field is required</span>}
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full"
          >
            Sign in with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Button
            onClick={handleGitHubSignIn}
            variant="outline"
            className="w-full"
          >
            Sign in with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
