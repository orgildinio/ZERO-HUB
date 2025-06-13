"use client"
import { z } from "zod"
import { bankFormSchema } from "../../schema"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { businessSubcategories } from "@/constants/razorpay-business-categories"

type ConfirmationModalProps = {
    data: z.infer<typeof bankFormSchema>;
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onConfirm: (data: z.infer<typeof bankFormSchema>) => void
}

export default function ConfirmationModal({ data, isOpen, isLoading, onClose, onConfirm }: ConfirmationModalProps) {

    const getSubcategoryLabel = (subcategory: string) => {
        return businessSubcategories.find((sub) => sub.value === subcategory)?.label;
    }

    const getAccountTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            savings: "Savings Account",
            current: "Current Account",
            salary: "Salary Account",
        }

        return types[type] || type
    }

    const getCountryLabel = (code: string) => {
        const countries: Record<string, string> = {
            in: "India",
            us: "United States",
            gb: "United Kingdom",
            ca: "Canada",
            au: "Australia",
            sg: "Singapore",
            ae: "United Arab Emirates",
            de: "Germany",
            fr: "France",
            jp: "Japan",
            cn: "China",
            br: "Brazil",
            za: "South Africa",
            other: "Other",
        }

        return countries[code] || code
    }

    const getStateLabel = (code: string) => {
        const states: Record<string, string> = {
            AP: "Andhra Pradesh",
            AR: "Arunachal Pradesh",
            AS: "Assam",
            BR: "Bihar",
            CG: "Chhattisgarh",
            GA: "Goa",
            GJ: "Gujarat",
            HR: "Haryana",
            HP: "Himachal Pradesh",
            JH: "Jharkhand",
            KA: "Karnataka",
            KL: "Kerala",
            MP: "Madhya Pradesh",
            MH: "Maharashtra",
            MN: "Manipur",
            ML: "Meghalaya",
            MZ: "Mizoram",
            NL: "Nagaland",
            OD: "Odisha",
            PB: "Punjab",
            RJ: "Rajasthan",
            SK: "Sikkim",
            TN: "Tamil Nadu",
            TS: "Telangana",
            TR: "Tripura",
            UK: "Uttarakhand",
            UP: "Uttar Pradesh",
            WB: "West Bengal",
            AN: "Andaman and Nicobar Islands",
            CH: "Chandigarh",
            DN: "Dadra and Nagar Haveli and Daman and Diu",
            DL: "Delhi",
            JK: "Jammu and Kashmir",
            LA: "Ladakh",
            LD: "Lakshadweep",
            PY: "Puducherry",
        }

        return data.country === "in" ? states[code] || code : code
    }

    const formatAddress = () => {
        let address = data.streetAddress
        if (data.addressLine2) address += ", " + data.addressLine2
        address += ", " + data.city
        address += ", " + getStateLabel(data.state)
        address += " " + data.postalCode
        address += ", " + getCountryLabel(data.country)
        return address
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-zinc-900 border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Confirm Your Information
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6">
                        <p className="text-yellow-200/90 text-sm">
                            Please carefully review all information. Once submitted, this information cannot be changed without
                            contacting support and going through additional verification.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 border-b border-zinc-800 pb-2 mb-3">
                                Business Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-zinc-500">Legal Business Name</p>
                                    <p className="text-sm text-zinc-300">{data.legalBusinessName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Business Category</p>
                                    <p className="text-sm text-zinc-300">
                                        {getSubcategoryLabel(data.businessSubcategory)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 border-b border-zinc-800 pb-2 mb-3">
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-zinc-500">Contact Name</p>
                                    <p className="text-sm text-zinc-300">{data.contactName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Email Address</p>
                                    <p className="text-sm text-zinc-300">{data.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Mobile Number</p>
                                    <p className="text-sm text-zinc-300">{data.phone}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-xs text-zinc-500">Business Address</p>
                                    <p className="text-sm text-zinc-300">{formatAddress()}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-zinc-300 border-b border-zinc-800 pb-2 mb-3">
                                Bank Account Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-zinc-500">Account Holder Name</p>
                                    <p className="text-sm text-zinc-300">{data.accountHolderName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Account Number</p>
                                    <p className="text-sm text-zinc-300">
                                        {data.accountNumber.substring(0, 4)}****
                                        {data.accountNumber.substring(data.accountNumber.length - 4)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">IFSC Code</p>
                                    <p className="text-sm text-zinc-300">{data.ifscCode}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Bank & Branch</p>
                                    <p className="text-sm text-zinc-300">
                                        {data.bankName} - {data.branchName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Account Type</p>
                                    <p className="text-sm text-zinc-300">{getAccountTypeLabel(data.accountType)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-4 mt-6 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <p className="text-sm text-zinc-300">
                            By clicking &qout;Confirm & Submit&qout;, you certify that all information provided is accurate and complete.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isLoading} className="border-zinc-700">
                        Go Back & Edit
                    </Button>
                    <Button
                        onClick={() => onConfirm(data)}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                            </>
                        ) : (
                            "Confirm & Submit"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
