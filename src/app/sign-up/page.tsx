'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { useToast } from '@/hooks/use-toast'
import supabase from "@/lib/supabase"

type Inputs = {
    name: string
    picture: string
    email: string
    password: string
}

export default function SignUp() {
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email, password } = data
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'https://example.com/welcome',
            },
        })
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            })
        }
        else {
            toast({
                title: "Success",
                description: `Sign up with ${email}`,
            })
        }
    }

    console.log(watch("password")) // watch input value by passing the name of it

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: '/',
            },
        })
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            })
        }
        else {
            toast({
                title: "Success",
                description: "Sign up with Google",
            })
        }
    }

    const handleGitHubSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: '/',
            },
        })
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            })
        }
        else {
            toast({
                title: "Success",
                description: "Sign up with GitHub",
            })
        }
    }

    return (
        <Card className="mx-auto max-w-sm my-8">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        {/* <div className="grid grid-cols-2 gap-4"> */}
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">Name</Label>
                            <Input
                                {...register("name", { required: true })}
                            />
                            {errors.email && <span>Name field is required</span>}
                        </div>
                        <div className="grid gap-2">
                            {/* <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    {...register("lastName", { required: true })}
                                /> */}
                            <Label htmlFor="picture">Picture</Label>
                            <Input
                                {...register("picture", { required: true })}
                                type="file"
                            />
                            {errors.email && <span>Picture field is required</span>}
                        </div>
                        {/* </div> */}
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register("password", { required: true })}
                                type="password"
                            />
                            {errors.password && <span>Password field is required</span>}
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline" className="w-full">
                        Sign up with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    <Button
                        onClick={handleGitHubSignIn}
                        variant="outline" className="w-full">
                        Sign up with GitHub
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
