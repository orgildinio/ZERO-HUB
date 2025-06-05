import { Mail, Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
    return (
        <section className="relative py-20 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-400 rounded-full blur-2xl animate-bounce delay-500"></div>
                </div>
            </div>

            <div className="container px-2 md:px-6 relative mx-auto">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 mb-6">
                        <Gift className="h-4 w-4" />
                        Exclusive Offers Inside
                    </div>

                    <h2 className="mb-4 text-4xl font-bold text-white leading-tight">Join Our Design Community</h2>
                    <p className="mb-8 text-xl text-stone-300 leading-relaxed">
                        Get early access to new collections, design tips from experts, and exclusive member-only discounts delivered
                        to your inbox.
                    </p>

                    <form className="flex flex-col gap-4 sm:flex-row max-w-md mx-auto">
                        <div className="relative flex-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 h-12 rounded-full border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-stone-300 focus:bg-white/20 transition-all duration-300"
                            />
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 h-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Subscribe
                        </Button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-6 text-sm text-stone-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            No spam, ever
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            Unsubscribe anytime
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            Weekly updates
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
