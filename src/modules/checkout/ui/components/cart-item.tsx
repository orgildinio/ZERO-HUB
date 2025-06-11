import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
    id: string
    image?: string | null;
    name: string;
    price: number;
    incrementQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
    decrementQuantity: (productId: string) => void;
    productQuantity: number
}

export const CartItem = ({ image, name, price, incrementQuantity, decrementQuantity, id, productQuantity, removeProduct }: Props) => {

    const handlePlusClick = (productId: string) => incrementQuantity(productId)
    const handleMinusClick = (productId: string) => decrementQuantity(productId)
    const handleRemove = (productId: string) => removeProduct(productId)

    return (
        <div className="grid grid-cols-1 border-b p-4 sm:grid-cols-6 sm:items-center">
            <div className="col-span-3 flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-md bg-gray-50">
                    <Image src={image || "/placeholder.png"} alt={name} fill className="object-cover" />
                </div>
                <div>
                    <h3 className="font-medium">{name}</h3>
                    <div className="mt-1 sm:hidden">
                        <span className="text-gray-500">${price}</span>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block">${price}</div>

            <div className="mt-4 flex items-center sm:mt-0">
                <div className="flex items-center">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none" onClick={() => handleMinusClick(id)}>
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <Input
                        type="number"
                        placeholder={productQuantity.toString()}
                        disabled
                        className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none placeholder:text-black"
                    />
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={() => handlePlusClick(id)}>
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                    </Button>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between sm:mt-0 sm:justify-start">
                <div className="sm:pr-6">${price * productQuantity}</div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={() => handleRemove(id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                </Button>
            </div>
        </div>
    )
}