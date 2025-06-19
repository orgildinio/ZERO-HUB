import React from 'react'
import { ArrowRight, CheckCircle, Globe, Rocket, Shield, Users, Zap, Mail, CreditCard, Store, User, Phone, Lock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocsToc } from '@/modules/docs/ui/components/docs-toc'
import { DocsHeader } from '@/modules/docs/ui/components/header'
import { Callout } from '@/modules/docs/ui/components/callout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DocsPager } from '@/modules/docs/ui/components/docs-pager'

const DocsPage = () => {
    return (
        <div className="container mx-auto px-2 md:px-6">
            <DocsHeader
                heading="Start Your Selling Journey"
                text="Create your seller account in just a few minutes and start building your online store with ZEROHUB's powerful e-commerce platform."
                badge="Account Setup"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Store className="h-5 w-5 text-green-400" />
                            <CardTitle className="text-lg">Create Store</CardTitle>
                        </div>
                        <CardDescription>Set up your seller account and store details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-green-500/10">
                            Get Started
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-400" />
                            <CardTitle className="text-lg">Verify Account</CardTitle>
                        </div>
                        <CardDescription>Complete verification and choose your plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-500/10">
                            Verify Now
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-purple-400" />
                            <CardTitle className="text-lg">Start Selling</CardTitle>
                        </div>
                        <CardDescription>Access your admin dashboard and add products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-purple-500/10">
                            Launch Store
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <DocsToc className="mb-8" />

            <div className="space-y-12">
                <section className='scroll-mt-20' id='signup-process'>
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Account Creation Process</h2>
                    <p className="text-zinc-300 leading-7">
                        Welcome to ZEROHUB! You&apos;ve clicked &quot;Start Selling&quot; on our homepage, now let&apos;s get your seller account set up.
                        This process takes less than 5 minutes and gets you ready to start selling online.
                    </p>

                    <div className="my-8">
                        <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20 flex items-center gap-2">
                            <Users className="h-5 w-5 text-green-400" />
                            Step-by-Step Account Setup
                        </h3>

                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/20">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold border border-green-500/30">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white mb-3 text-lg">Complete Registration Form</h4>
                                    <p className="text-zinc-300 text-sm mb-4">
                                        Fill out the signup form with your basic information to create your seller account.
                                    </p>

                                    {/* Mock Form Preview */}
                                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50 mb-4">
                                        <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                                            <Store className="h-4 w-4" />
                                            Seller Registration Form
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
                                                    <Mail className="h-4 w-4 text-blue-400" />
                                                    <span className="text-zinc-300">Email Address *</span>
                                                </div>
                                                <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
                                                    <Phone className="h-4 w-4 text-green-400" />
                                                    <span className="text-zinc-300">Phone Number *</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
                                                    <User className="h-4 w-4 text-purple-400" />
                                                    <span className="text-zinc-300">Username *</span>
                                                </div>
                                                <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
                                                    <Lock className="h-4 w-4 text-red-400" />
                                                    <span className="text-zinc-300">Password *</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-2 bg-zinc-800/50 rounded">
                                            <div className="flex items-center gap-2">
                                                <Store className="h-4 w-4 text-amber-400" />
                                                <span className="text-zinc-300">Store Name *</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <CheckCircle className="h-4 w-4 text-blue-400" />
                                        <span className="text-sm text-blue-300">All fields marked with * are required</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg border border-blue-500/20">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white mb-3 text-lg">Account Creation & Redirect</h4>
                                    <p className="text-zinc-300 text-sm mb-4">
                                        Once you submit the form, your account is created and you&apos;ll be automatically redirected to your admin dashboard.
                                    </p>

                                    {/* Mock Dashboard Preview */}
                                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50 mb-4">
                                        <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                                            <Shield className="h-4 w-4" />
                                            Admin Dashboard Preview
                                        </h5>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                            <div className="bg-green-500/10 p-2 rounded border border-green-500/20 text-center">
                                                <div className="text-green-400 font-semibold">Store Setup</div>
                                                <div className="text-zinc-400">Configure store</div>
                                            </div>
                                            <div className="bg-blue-500/10 p-2 rounded border border-blue-500/20 text-center">
                                                <div className="text-blue-400 font-semibold">Products</div>
                                                <div className="text-zinc-400">Add inventory</div>
                                            </div>
                                            <div className="bg-purple-500/10 p-2 rounded border border-purple-500/20 text-center">
                                                <div className="text-purple-400 font-semibold">Orders</div>
                                                <div className="text-zinc-400">Manage sales</div>
                                            </div>
                                            <div className="bg-amber-500/10 p-2 rounded border border-amber-500/20 text-center">
                                                <div className="text-amber-400 font-semibold">Analytics</div>
                                                <div className="text-zinc-400">Track performance</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                        <Rocket className="h-4 w-4 text-purple-400" />
                                        <span className="text-sm text-purple-300">Instant access to your seller dashboard</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-500/20">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white mb-3 text-lg">Subscription Verification</h4>
                                    <p className="text-zinc-300 text-sm mb-4">
                                        Complete the final step by verifying your account and selecting your subscription plan to unlock all features.
                                    </p>

                                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50 mb-4">
                                        <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            Verification Process
                                        </h5>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-400 rounded-full" />
                                                <span className="text-zinc-300">Email verification</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                                <span className="text-zinc-300">Phone number confirmation</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                                <span className="text-zinc-300">Choose subscription plan</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                                                <span className="text-zinc-300">Account activation</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                        <span className="text-sm text-green-300">Final step to activate your selling account</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Callout className="my-8">
                        <p>
                            <strong>Quick Setup!</strong> The entire process takes less than 5 minutes. You can start adding products immediately after verification.
                        </p>
                    </Callout>
                </section>

                <section id="form-requirements" className="scroll-mt-20">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Registration Requirements</h2>
                    <p className="text-zinc-300 leading-7">
                        Make sure you have the following information ready before starting the registration process.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-green-400" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription>Required details for account creation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Mail className="h-4 w-4 text-blue-400" />
                                        <div>
                                            <div className="font-medium text-white">Valid Email Address</div>
                                            <div className="text-zinc-400">Used for account verification and notifications</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Phone className="h-4 w-4 text-green-400" />
                                        <div>
                                            <div className="font-medium text-white">Phone Number</div>
                                            <div className="text-zinc-400">For SMS verification and support</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <User className="h-4 w-4 text-purple-400" />
                                        <div>
                                            <div className="font-medium text-white">Username</div>
                                            <div className="text-zinc-400">Unique identifier for your account</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-800/20 border-zinc-700/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Store className="h-5 w-5 text-amber-400" />
                                    Store Information
                                </CardTitle>
                                <CardDescription>Details about your business</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Store className="h-4 w-4 text-amber-400" />
                                        <div>
                                            <div className="font-medium text-white">Store Name</div>
                                            <div className="text-zinc-400">What customers will see as your brand</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Lock className="h-4 w-4 text-red-400" />
                                        <div>
                                            <div className="font-medium text-white">Secure Password</div>
                                            <div className="text-zinc-400">Minimum 8 characters with special characters</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                        <Globe className="h-4 w-4 text-blue-400" />
                                        <div>
                                            <div className="font-medium text-white">Business Category</div>
                                            <div className="text-zinc-400">Optional: Help us customize your experience</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section id="after-creation" className="scroll-mt-20">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">What Happens Next?</h2>
                    <p className="text-zinc-300 leading-7">
                        After completing the registration form, here&apos;s what you can expect in your seller journey.
                    </p>

                    <Tabs defaultValue="dashboard" className="my-8">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="dashboard" className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Admin Access
                            </TabsTrigger>
                            <TabsTrigger value="verification" className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Verification
                            </TabsTrigger>
                            <TabsTrigger value="selling" className="flex items-center gap-2">
                                <Rocket className="h-4 w-4" />
                                Start Selling
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="dashboard" className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
                                <h3 className="text-lg font-semibold text-white mb-2">Immediate Dashboard Access</h3>
                                <p className="text-zinc-300 mb-4">
                                    Right after registration, you&apos;ll be redirected to your admin dashboard where you can start configuring your store.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                                        <Store className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                                        <div className="text-sm font-medium text-white">Store Settings</div>
                                        <div className="text-xs text-zinc-400">Configure basic info</div>
                                    </div>
                                    <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                                        <Zap className="h-6 w-6 text-green-400 mx-auto mb-1" />
                                        <div className="text-sm font-medium text-white">Product Upload</div>
                                        <div className="text-xs text-zinc-400">Add your inventory</div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="verification" className="space-y-4">
                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
                                <h3 className="text-lg font-semibold text-white mb-2">Account Verification Process</h3>
                                <p className="text-zinc-300 mb-4">
                                    Complete the verification process to unlock all selling features and payment processing.
                                </p>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                                            <Mail className="h-3 w-3 text-green-400" />
                                        </div>
                                        <span className="text-zinc-300">Email verification link sent</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                                            <Phone className="h-3 w-3 text-blue-400" />
                                        </div>
                                        <span className="text-zinc-300">SMS verification code</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                                            <CreditCard className="h-3 w-3 text-purple-400" />
                                        </div>
                                        <span className="text-zinc-300">Choose subscription plan</span>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="selling" className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
                                <h3 className="text-lg font-semibold text-white mb-2">Ready to Sell</h3>
                                <p className="text-zinc-300 mb-4">
                                    Once verified, you have full access to all selling features and can start accepting payments.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                                        <div className="text-lg font-bold text-purple-400">∞</div>
                                        <div className="text-xs text-zinc-400">Unlimited products</div>
                                    </div>
                                    <div className="text-center p-3 bg-zinc-800/50 rounded-lg">
                                        <div className="text-lg font-bold text-green-400">24/7</div>
                                        <div className="text-xs text-zinc-400">Support available</div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>

                <section id="important-notes" className="scroll-mt-20">
                    <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Important Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <Callout variant="info" className="h-fit">
                            <p>
                                <strong>Email Verification Required:</strong> You must verify your email address before you can start selling. Check your inbox immediately after registration.
                            </p>
                        </Callout>

                        <Callout className="h-fit">
                            <p>
                                <strong>Secure Your Account:</strong> Use a strong password and enable two-factor authentication for maximum security of your seller account.
                            </p>
                        </Callout>
                    </div>
                </section>
            </div>

            <DocsPager
                next={{
                    href: "/docs/subscription-verification",
                    title: "Subscription Verification",
                }}
            />
        </div>
    )
}

export default DocsPage