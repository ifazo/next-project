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
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/store/hook";
// import { setUser } from "@/store/features/userSlice";

type Inputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();
  // const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signIn("credentials", { ...data, redirect: false })
      .then((res) => {
        if (res?.error === "CredentialsSignin") {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid email or password",
          });
        }
        else {
          toast({
            title: "Success",
            description: `Sign in with ${data.email}`,
          });
          router.push("/");
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      });
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" })
      .then(() => {
        // dispatch(setUser(session?.user));
        toast({
          title: "Success",
          description: "Sign in with Google",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      });
  };

  const handleGitHubSignIn = async () => {
    await signIn("github", { callbackUrl: "/" })
      .then(() => {
        // dispatch(setUser(session?.user));
        toast({
          title: "Success",
          description: "Sign in with Github",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button onClick={handleGitHubSignIn} variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button onClick={handleGoogleSignIn} variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
              <Button className="w-full">Login account</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary mx-2">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
