"use client";

import {useRouter} from "next/navigation";
import { FormEvent } from 'react'

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {setCookie} from 'cookies-next';

export default function Login() {

    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
        });
        const {success} = await res.json();

        if (success) {
            setCookie('username', username);
            router.push('/currency')
        } else {
            alert("Login failed");
        }
    };

    return (
        <main>
            <div className="container mx-auto h-screen flex items-center justify-center">
                <div className="column-1">
                    <Card className="w-full max-w-sm mx-auto">
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle className="text-2xl">Login</CardTitle>
                                <CardDescription>
                                    Enter username below to login to your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Email</Label>
                                    <Input id="name" type="text" name="username" placeholder="Username" required/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" name="password" placeholder="Password" required/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" type="submit">Sign in</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </main>

    );
}