"use client"

import {
    AlertCircle,
    AlertTriangle,
    Building,
    CheckCircle,
    CreditCard,
    FileCheck,
    Globe,
    Home,
    Info,
    Loader,
    Loader2,
    MapPin,
    MapPinned,
    User
} from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { bankFormSchema } from "../../schema"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import ConfirmationModal from "./confirmation-modal"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { businessSubcategories } from "@/constants/razorpay-business-categories"
import { COUNTRIES_WITH_STATES, getStatesByCountry, hasStates } from "@/constants/countries"
import { validateIFSC } from "@/constants/razorpay"

export const BankForm = ({ email, phone }: { email: string; phone: string }) => {

    const router = useRouter();
    const [ifscStatus, setIfscStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle")
    const [currentStep, setCurrentStep] = useState<"business" | "contact" | "bank">("business")
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [formData, setFormData] = useState<z.infer<typeof bankFormSchema> | null>(null)

    const form = useForm<z.infer<typeof bankFormSchema>>({
        resolver: zodResolver(bankFormSchema),
        defaultValues: {
            legalBusinessName: "",
            businessSubcategory: "",
            contactName: "",
            email: email,
            phone: phone,
            streetAddress: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "in",
            accountHolderName: "",
            accountNumber: "",
            confirmAccountNumber: "",
            ifscCode: "",
            bankName: "",
            branchName: "",
            accountType: "",
            panCardNumber: "",
            termsAccepted: false,
        },
    })

    const selectedCountry = form.watch('country')

    const availableStates = useMemo(() => {
        return selectedCountry ? getStatesByCountry(selectedCountry) : []
    }, [selectedCountry])

    useEffect(() => {
        if (selectedCountry) {
            form.setValue('state', '')
        }
    }, [selectedCountry, form])

    const ifscCode = form.watch("ifscCode")
    useEffect(() => {
        if (ifscCode && ifscCode.length === 11) {
            setIfscStatus("checking");

            const validateCode = async () => {
                const result = await validateIFSC(ifscCode);

                if (result.isValid) {
                    form.setValue("bankName", result.bank);
                    form.setValue("branchName", result.branch);
                    setIfscStatus("valid");

                    form.clearErrors("ifscCode");
                } else {
                    form.setError("ifscCode", {
                        type: "manual",
                        message: "IFSC code not found. Please check and try again.",
                    });
                    setIfscStatus("invalid");
                    form.setValue("bankName", "");
                    form.setValue("branchName", "");
                }
            };

            const timeoutId = setTimeout(validateCode, 800);
            return () => clearTimeout(timeoutId);
        } else {
            setIfscStatus("idle");
            form.setValue("bankName", "");
            form.setValue("branchName", "");
        }
    }, [ifscCode, form]);

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const verifyMutation = useMutation(trpc.subscriptions.verify.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
            toast.success("Bank verified! Redirecting to admin page.")
            router.push('/admin')
        }
    }))

    const onSubmit = (data: z.infer<typeof bankFormSchema>) => {
        setFormData(data)
        setShowConfirmation(true)
    }

    const handleConfirm = (data: z.infer<typeof bankFormSchema>) => {
        verifyMutation.mutate(data)
    }

    const handleNextStep = () => {
        if (currentStep === "business") {
            const businessFields = ["legalBusinessName", "businessCategory", "businessSubcategory"]
            const businessValid = businessFields.every((field) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fieldState = form.getFieldState(field as any)
                return !fieldState.invalid
            })

            if (businessValid) {
                setCurrentStep("contact")
            } else {
                form.trigger(["legalBusinessName", "businessSubcategory"])
            }
        } else if (currentStep === "contact") {
            const contactFields = [
                "contactName",
                "streetAddress",
                "city",
                "state",
                "postalCode",
                "country",
            ]
            const contactValid = contactFields.every((field) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const fieldState = form.getFieldState(field as any)
                return !fieldState.invalid
            })

            if (contactValid) {
                setCurrentStep("bank")
            } else {
                form.trigger([
                    "contactName",
                    "streetAddress",
                    "city",
                    "state",
                    "postalCode",
                    "country",
                ])
            }
        }
    }

    const handlePrevStep = () => {
        if (currentStep === "contact") {
            setCurrentStep("business")
        } else if (currentStep === "bank") {
            setCurrentStep("contact")
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-zinc-400">
                                Step {currentStep === "business" ? "1" : currentStep === "contact" ? "2" : "3"} of 3
                            </div>
                            <div className="text-sm font-medium text-zinc-400">
                                {currentStep === "business"
                                    ? "Business Information"
                                    : currentStep === "contact"
                                        ? "Contact Details"
                                        : "Banking Information"}
                            </div>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300"
                                style={{ width: currentStep === "business" ? "33.3%" : currentStep === "contact" ? "66.6%" : "100%" }}
                            ></div>
                        </div>
                    </div>
                    {currentStep === "business" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center">
                                    <Building className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-200">Business Information</h3>
                                    <p className="text-sm text-zinc-400">Tell us about your business</p>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="legalBusinessName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="flex items-center gap-1">
                                                Legal Business Name <span className="text-red-500">*</span>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="h-3.5 w-3.5 text-zinc-500 cursor-help" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-xs">
                                                            <p>
                                                                Enter the registered legal name of your business as it appears on official documents.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </FormLabel>
                                            <span className="text-xs text-red-400 font-medium">Cannot be changed later</span>
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your legal business name"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500" />
                                            <span>Enter the name exactly as it appears on your registration documents</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessSubcategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            Business category <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 w-full">
                                                    <SelectValue
                                                        placeholder={"Select business category"}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {businessSubcategories.map((subcategory) => (
                                                    <SelectItem key={subcategory.value} value={subcategory.value}>
                                                        {subcategory.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>Select a more specific classification for your business</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}
                    {currentStep === "contact" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-200">Contact Information</h3>
                                    <p className="text-sm text-zinc-400">Provide your contact details</p>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="contactName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            Contact Person Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter the name of the primary contact person"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>Name of the person responsible for this account</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-3 pt-4 pb-2">
                                <div className="h-8 w-8 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center">
                                    <MapPin className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-zinc-200">Business Address</h3>
                                    <p className="text-xs text-zinc-400">Enter your registered business address</p>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            Street Address <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Home className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                                <Input
                                                    placeholder="Street name, building number"
                                                    {...field}
                                                    className="bg-zinc-800/50 border-zinc-700 pl-10"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>Enter your street address, building name/number</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="addressLine2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">Address Line 2</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Apartment, suite, unit, etc."
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>Additional address information if needed</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1">
                                                City <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <MapPinned className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                                    <Input
                                                        placeholder="Enter city name"
                                                        {...field}
                                                        className="bg-zinc-800/50 border-zinc-700 pl-10"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="postalCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1">
                                                Postal Code <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter postal/ZIP code"
                                                    {...field}
                                                    className="bg-zinc-800/50 border-zinc-700"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1">
                                                Country <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <div className="relative">
                                                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 pl-10 w-full">
                                                            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                                            <SelectValue placeholder="Select country" />
                                                        </SelectTrigger>
                                                    </div>
                                                </FormControl>
                                                <SelectContent>
                                                    {COUNTRIES_WITH_STATES.map((country) => (
                                                        <SelectItem key={country.code} value={country.code}>
                                                            {country.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-1">
                                                State/Province <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                {hasStates(selectedCountry) ? (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 w-full">
                                                            <SelectValue placeholder="Select state" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {availableStates.map((state) => (
                                                                <SelectItem key={state.code} value={state.name.toUpperCase()}>
                                                                    {state.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Input
                                                        placeholder="Enter state/province"
                                                        {...field}
                                                        className="bg-zinc-800/50 border-zinc-700"
                                                    />
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button
                                    type="button"
                                    onClick={handlePrevStep}
                                    variant="outline"
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                >
                                    Back to Business Info
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}
                    {currentStep === "bank" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center">
                                    <CreditCard className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-200">Banking Information</h3>
                                    <p className="text-sm text-zinc-400">Provide your bank account details</p>
                                </div>
                            </div>

                            <div className="bg-red-900/30 border-2 border-red-700/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                                <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-red-400 text-lg mb-1">CRITICAL: Verify All Information</h3>
                                    <p className="text-red-200/90">
                                        The bank details you provide <span className="font-bold underline">CANNOT be changed later</span>{" "}
                                        without a formal verification process that takes 7-10 business days. Please ensure all information
                                        is 100% accurate before submission.
                                    </p>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="accountHolderName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="flex items-center gap-1">
                                                Account Holder Name <span className="text-red-500">*</span>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="h-3.5 w-3.5 text-zinc-500 cursor-help" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-xs">
                                                            <p>
                                                                Enter the name exactly as it appears on your bank account. Any mismatch may cause
                                                                payment failures.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </FormLabel>
                                            <span className="text-xs text-red-400 font-medium">Cannot be changed later</span>
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter name as per bank records"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500" />
                                            <span>Enter the name exactly as it appears on your bank account</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accountNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="flex items-center gap-1">
                                                Account Number <span className="text-red-500">*</span>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="h-3.5 w-3.5 text-zinc-500 cursor-help" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-xs">
                                                            <p>
                                                                Your account number is typically 10-14 digits and can be found on your checkbook or bank
                                                                statement.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </FormLabel>
                                            <span className="text-xs text-red-400 font-medium">Cannot be changed later</span>
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your account number"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>Your account number is typically 10-14 digits</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmAccountNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            Confirm Account Number <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Re-enter your account number"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3 text-yellow-500" />
                                            <span>Double-check your account number to avoid payment issues</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ifscCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="flex items-center gap-1">
                                                IFSC Code <span className="text-red-500">*</span>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="h-3.5 w-3.5 text-zinc-500 cursor-help" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-xs">
                                                            <p>
                                                                The IFSC (Indian Financial System Code) is an 11-character code that identifies your
                                                                bank branch.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </FormLabel>
                                            <span className="text-xs text-red-400 font-medium">Cannot be changed later</span>
                                        </div>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    placeholder="e.g., HDFC0001234"
                                                    {...field}
                                                    className="bg-zinc-800/50 border-zinc-700 pr-10 uppercase"
                                                    maxLength={11}
                                                />
                                                <div className="absolute right-3 top-2.5">
                                                    {ifscStatus === "checking" && <Loader2 className="h-4 w-4 text-zinc-400 animate-spin" />}
                                                    {ifscStatus === "valid" && <CheckCircle className="h-4 w-4 text-green-500" />}
                                                    {ifscStatus === "invalid" && <AlertCircle className="h-4 w-4 text-red-500" />}
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>11-character code that identifies your bank branch (e.g., HDFC0001234)</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bankName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Bank Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Auto-populated from IFSC"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>This will be auto-populated when you enter a valid IFSC code</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="branchName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Branch Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Auto-populated from IFSC"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700"
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>This will be auto-populated when you enter a valid IFSC code</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            Account Type <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-800/50 border-zinc-700 w-full">
                                                    <SelectValue placeholder="Select account type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="savings">Savings Account</SelectItem>
                                                <SelectItem value="current">Current Account</SelectItem>
                                                <SelectItem value="salary">Salary Account</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>Select the type of your bank account</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center gap-3 pt-4 pb-2">
                                <div className="h-8 w-8 rounded-full bg-blue-900/30 border border-blue-700/30 flex items-center justify-center">
                                    <FileCheck className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-zinc-200">PAN Card Details</h3>
                                    <p className="text-xs text-zinc-400">Provide your PAN (Permanent Account Number) details</p>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="panCardNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-1">
                                            PAN Card Number <span className="text-red-500">*</span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-3.5 w-3.5 text-zinc-500 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs">
                                                        <p>Enter your 10-character PAN (Permanent Account Number) in the format AAAAA0000A.</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., ABCDE1234F"
                                                {...field}
                                                className="bg-zinc-800/50 border-zinc-700 uppercase"
                                                maxLength={10}
                                            />
                                        </FormControl>
                                        <FormDescription className="flex items-center gap-1">
                                            <Info className="h-3 w-3 text-blue-400" />
                                            <span>10-character identification number issued by the Income Tax Department</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="termsAccepted"
                                render={({ field }) => (
                                    <FormItem className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4 space-y-2">
                                        <div className="flex items-start space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="rounded border-zinc-700 text-blue-600 focus:ring-blue-600 bg-zinc-800 mt-1"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-medium text-zinc-200">
                                                    I confirm that all information provided is accurate and complete
                                                </FormLabel>
                                                <FormDescription className="text-xs">
                                                    By checking this box, I acknowledge that I am the legal owner or authorized signatory of this
                                                    account and understand this information cannot be changed without contacting support and going
                                                    through additional verification.
                                                </FormDescription>
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-sm text-red-200/80">
                                <p className="font-medium mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                    Final Verification
                                </p>
                                <p className="mb-2">
                                    Please review all information carefully before submission. Incorrect bank details may result in:
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Failed payments</li>
                                    <li>Delayed withdrawals</li>
                                    <li>Account verification issues</li>
                                    <li>Lengthy correction process (7-10 business days)</li>
                                </ul>
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button
                                    type="button"
                                    onClick={handlePrevStep}
                                    variant="outline"
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                >
                                    Back to Contact Info
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                                    disabled={verifyMutation.isPending}
                                >
                                    {
                                        verifyMutation.isPending ? (
                                            <div className="flex items-center">
                                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </div>
                                        ) : (
                                            <p>Submit all details.</p>
                                        )
                                    }
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </Form>
            {showConfirmation && formData && (
                <ConfirmationModal
                    data={formData}
                    isOpen={showConfirmation}
                    isLoading={verifyMutation.isPending}
                    onClose={() => setShowConfirmation(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    )
}