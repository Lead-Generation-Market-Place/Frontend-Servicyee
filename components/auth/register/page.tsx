import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


export default function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Create an account
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-balance">
                    Enter your details below to create an account
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Business Name:
                    </Label>
                    <Input
                        id="Business"
                        type="text"
                        placeholder="Yeplax"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        First & Last Name:
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Alex Morgan"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="text"
                        placeholder="Technical@servicyee.com"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Phone Number:
                    </Label>
                    <Input
                        id="phone"
                        type="text"
                        placeholder="(202) 830-4424"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Website or Social Media:
                    </Label>
                    <Input
                        id="media"
                        type="text"
                        placeholder="www.servicyee.com"
                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-primary-500 dark:focus:ring-primary-400"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Categories:
                    </Label>
                    <Select name="category" >
                        <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-primary-500 dark:focus:ring-primary-400">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="home-services">Home Services</SelectItem>
                            <SelectItem value="it-services">IT Services</SelectItem>
                            <SelectItem value="food-delivery">Food Delivery</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                            <SelectItem value="grocery">Grocery</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            <div className="grid gap-3">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Categories:
                    </Label>
                    <Select name="category" >
                        <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-primary-500 dark:focus:ring-primary-400">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="home-services">Home Services</SelectItem>
                            <SelectItem value="it-services">IT Services</SelectItem>
                            <SelectItem value="food-delivery">Food Delivery</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                            <SelectItem value="grocery">Grocery</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <Button type="submit" className="dark:text-white w-full bg-[#0077B6] hover:bg-[#35a5e1] rounded-[4px]">
                    Continue
                </Button>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                        href="#"
                        className="underline underline-offset-4 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </form>
    )
}