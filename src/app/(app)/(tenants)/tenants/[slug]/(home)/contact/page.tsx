import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with our team for any questions or inquiries",
}

export default function ContactPage() {
    return (
        <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h1>
                <p className="text-gray-500">We'd love to hear from you</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                    <div className="mb-8 rounded-lg border bg-gray-50 p-6">
                        <h2 className="mb-4 text-xl font-medium">Get in Touch</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="mt-1 h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-gray-600">hello@minima-store.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="mt-1 h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="font-medium">Phone</p>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="font-medium">Address</p>
                                    <p className="text-gray-600">
                                        123 Design Street
                                        <br />
                                        San Francisco, CA 94103
                                        <br />
                                        United States
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-xl font-medium">Store Hours</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span>9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday</span>
                                <span>10:00 AM - 5:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span>Closed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <form className="space-y-6 rounded-lg border p-6">
                        <h2 className="mb-4 text-xl font-medium">Send us a Message</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="first-name" className="text-sm font-medium">
                                    First Name
                                </label>
                                <Input id="first-name" placeholder="Enter your first name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="last-name" className="text-sm font-medium">
                                    Last Name
                                </label>
                                <Input id="last-name" placeholder="Enter your last name" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">
                                Subject
                            </label>
                            <Input id="subject" placeholder="Enter the subject" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">
                                Message
                            </label>
                            <Textarea id="message" placeholder="Enter your message" rows={5} />
                        </div>
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="mb-6 text-xl font-medium">Our Location</h2>
                <div className="h-[400px] overflow-hidden rounded-lg bg-gray-200">
                    {/* In a real app, you would embed a map here */}
                    <div className="flex h-full items-center justify-center">
                        <p className="text-gray-600">Map would be embedded here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
