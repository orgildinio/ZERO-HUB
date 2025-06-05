import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantUrl(tenantSlug: string) {

  if (process.env.NODE_ENV === "development") return `/tenants/${tenantSlug}`

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  return `${protocol}://${tenantSlug}.${domain}`
}