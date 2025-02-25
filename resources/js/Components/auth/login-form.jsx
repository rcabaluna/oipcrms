import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export function LoginForm({ className, ...props }) {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">OIPCRMS</CardTitle>
                    <CardDescription>
                        <small>
                            Office and Individual Performance Commitment and
                            Review <br />
                            Management System
                        </small>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <span className="text-center">
                                    {errors.username && (
                                        <span className="text-red-500 text-sm">
                                            {errors.username}
                                        </span>
                                    )}
                                </span>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData("username", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <span className="text-red-500 text-sm">
                                            {errors.password}
                                        </span>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing ? "Logging in..." : "Login"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-center text-xs text-muted-foreground">
                Developed by{" "}
                <a
                    href="https://region10.dost.gov.ph"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    DOST 10
                </a>{" "}
                - MIS Unit.
            </div>
        </div>
    );
}
