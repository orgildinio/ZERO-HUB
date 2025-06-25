import { relations } from "drizzle-orm/relations";
import { tenants, media, productsImages, products, productsSpecifications, usersTenants, users, productsRels, tags, productsVariants, categories, reviews, subscriptions, subscriptionPlans, payloadLockedDocuments, payloadLockedDocumentsRels, customers, orders, categorySalesSummary, productsMonthlySales, monthlySalesSummary, usersRoles, productsVariantsOptions, subscriptionPlansFeatures, payloadPreferences, payloadPreferencesRels, ordersOrderItems } from "./schema";

export const mediaRelations = relations(media, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [media.tenantId],
		references: [tenants.id]
	}),
	productsImages: many(productsImages),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	categories_thumbnailId: many(categories, {
		relationName: "categories_thumbnailId_media_id"
	}),
	categories_seoOgImageId: many(categories, {
		relationName: "categories_seoOgImageId_media_id"
	}),
}));

export const tenantsRelations = relations(tenants, ({many}) => ({
	media: many(media),
	usersTenants: many(usersTenants),
	products: many(products),
	tags: many(tags),
	reviews: many(reviews),
	subscriptions: many(subscriptions),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	categories: many(categories),
	customers: many(customers),
	orders: many(orders),
	categorySalesSummaries: many(categorySalesSummary),
	productsMonthlySales: many(productsMonthlySales),
	monthlySalesSummaries: many(monthlySalesSummary),
}));

export const productsImagesRelations = relations(productsImages, ({one}) => ({
	media: one(media, {
		fields: [productsImages.imageId],
		references: [media.id]
	}),
	product: one(products, {
		fields: [productsImages.parentId],
		references: [products.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productsImages: many(productsImages),
	productsSpecifications: many(productsSpecifications),
	productsRels: many(productsRels),
	productsVariants: many(productsVariants),
	tenant: one(tenants, {
		fields: [products.tenantId],
		references: [tenants.id]
	}),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	reviews: many(reviews),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	productsMonthlySales: many(productsMonthlySales),
}));

export const productsSpecificationsRelations = relations(productsSpecifications, ({one}) => ({
	product: one(products, {
		fields: [productsSpecifications.parentId],
		references: [products.id]
	}),
}));

export const usersTenantsRelations = relations(usersTenants, ({one}) => ({
	tenant: one(tenants, {
		fields: [usersTenants.tenantId],
		references: [tenants.id]
	}),
	user: one(users, {
		fields: [usersTenants.parentId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	usersTenants: many(usersTenants),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	usersRoles: many(usersRoles),
	payloadPreferencesRels: many(payloadPreferencesRels),
}));

export const productsRelsRelations = relations(productsRels, ({one}) => ({
	product: one(products, {
		fields: [productsRels.parentId],
		references: [products.id]
	}),
	tag: one(tags, {
		fields: [productsRels.tagsId],
		references: [tags.id]
	}),
}));

export const tagsRelations = relations(tags, ({one, many}) => ({
	productsRels: many(productsRels),
	tenant: one(tenants, {
		fields: [tags.tenantId],
		references: [tenants.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const productsVariantsRelations = relations(productsVariants, ({one, many}) => ({
	product: one(products, {
		fields: [productsVariants.parentId],
		references: [products.id]
	}),
	productsVariantsOptions: many(productsVariantsOptions),
}));

export const categoriesRelations = relations(categories, ({one, many}) => ({
	products: many(products),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	tenant: one(tenants, {
		fields: [categories.tenantId],
		references: [tenants.id]
	}),
	category: one(categories, {
		fields: [categories.parentId],
		references: [categories.id],
		relationName: "categories_parentId_categories_id"
	}),
	categories: many(categories, {
		relationName: "categories_parentId_categories_id"
	}),
	media_thumbnailId: one(media, {
		fields: [categories.thumbnailId],
		references: [media.id],
		relationName: "categories_thumbnailId_media_id"
	}),
	media_seoOgImageId: one(media, {
		fields: [categories.seoOgImageId],
		references: [media.id],
		relationName: "categories_seoOgImageId_media_id"
	}),
	categorySalesSummaries: many(categorySalesSummary),
	productsMonthlySales: many(productsMonthlySales),
}));

export const reviewsRelations = relations(reviews, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [reviews.tenantId],
		references: [tenants.id]
	}),
	product: one(products, {
		fields: [reviews.productId],
		references: [products.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const subscriptionsRelations = relations(subscriptions, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [subscriptions.tenantId],
		references: [tenants.id]
	}),
	subscriptionPlan: one(subscriptionPlans, {
		fields: [subscriptions.planId],
		references: [subscriptionPlans.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const subscriptionPlansRelations = relations(subscriptionPlans, ({many}) => ({
	subscriptions: many(subscriptions),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	subscriptionPlansFeatures: many(subscriptionPlansFeatures),
}));

export const payloadLockedDocumentsRelsRelations = relations(payloadLockedDocumentsRels, ({one}) => ({
	payloadLockedDocument: one(payloadLockedDocuments, {
		fields: [payloadLockedDocumentsRels.parentId],
		references: [payloadLockedDocuments.id]
	}),
	user: one(users, {
		fields: [payloadLockedDocumentsRels.usersId],
		references: [users.id]
	}),
	media: one(media, {
		fields: [payloadLockedDocumentsRels.mediaId],
		references: [media.id]
	}),
	tenant: one(tenants, {
		fields: [payloadLockedDocumentsRels.tenantsId],
		references: [tenants.id]
	}),
	product: one(products, {
		fields: [payloadLockedDocumentsRels.productsId],
		references: [products.id]
	}),
	tag: one(tags, {
		fields: [payloadLockedDocumentsRels.tagsId],
		references: [tags.id]
	}),
	category: one(categories, {
		fields: [payloadLockedDocumentsRels.categoriesId],
		references: [categories.id]
	}),
	review: one(reviews, {
		fields: [payloadLockedDocumentsRels.reviewsId],
		references: [reviews.id]
	}),
	subscriptionPlan: one(subscriptionPlans, {
		fields: [payloadLockedDocumentsRels.subscriptionPlansId],
		references: [subscriptionPlans.id]
	}),
	subscription: one(subscriptions, {
		fields: [payloadLockedDocumentsRels.subscriptionsId],
		references: [subscriptions.id]
	}),
	customer: one(customers, {
		fields: [payloadLockedDocumentsRels.customersId],
		references: [customers.id]
	}),
	order: one(orders, {
		fields: [payloadLockedDocumentsRels.ordersId],
		references: [orders.id]
	}),
	categorySalesSummary: one(categorySalesSummary, {
		fields: [payloadLockedDocumentsRels.categorySalesSummaryId],
		references: [categorySalesSummary.id]
	}),
	productsMonthlySale: one(productsMonthlySales, {
		fields: [payloadLockedDocumentsRels.productsMonthlySalesId],
		references: [productsMonthlySales.id]
	}),
	monthlySalesSummary: one(monthlySalesSummary, {
		fields: [payloadLockedDocumentsRels.monthlySalesSummaryId],
		references: [monthlySalesSummary.id]
	}),
}));

export const payloadLockedDocumentsRelations = relations(payloadLockedDocuments, ({many}) => ({
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const customersRelations = relations(customers, ({one, many}) => ({
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	tenant: one(tenants, {
		fields: [customers.tenantId],
		references: [tenants.id]
	}),
	orders: many(orders),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	tenant: one(tenants, {
		fields: [orders.tenantId],
		references: [tenants.id]
	}),
	customer: one(customers, {
		fields: [orders.customerId],
		references: [customers.id]
	}),
	ordersOrderItems: many(ordersOrderItems),
}));

export const categorySalesSummaryRelations = relations(categorySalesSummary, ({one, many}) => ({
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	tenant: one(tenants, {
		fields: [categorySalesSummary.tenantId],
		references: [tenants.id]
	}),
	category: one(categories, {
		fields: [categorySalesSummary.categoryId],
		references: [categories.id]
	}),
}));

export const productsMonthlySalesRelations = relations(productsMonthlySales, ({one, many}) => ({
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	tenant: one(tenants, {
		fields: [productsMonthlySales.tenantId],
		references: [tenants.id]
	}),
	category: one(categories, {
		fields: [productsMonthlySales.categoryId],
		references: [categories.id]
	}),
	product: one(products, {
		fields: [productsMonthlySales.productId],
		references: [products.id]
	}),
}));

export const monthlySalesSummaryRelations = relations(monthlySalesSummary, ({one, many}) => ({
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	tenant: one(tenants, {
		fields: [monthlySalesSummary.tenantId],
		references: [tenants.id]
	}),
}));

export const usersRolesRelations = relations(usersRoles, ({one}) => ({
	user: one(users, {
		fields: [usersRoles.parentId],
		references: [users.id]
	}),
}));

export const productsVariantsOptionsRelations = relations(productsVariantsOptions, ({one}) => ({
	productsVariant: one(productsVariants, {
		fields: [productsVariantsOptions.parentId],
		references: [productsVariants.id]
	}),
}));

export const subscriptionPlansFeaturesRelations = relations(subscriptionPlansFeatures, ({one}) => ({
	subscriptionPlan: one(subscriptionPlans, {
		fields: [subscriptionPlansFeatures.parentId],
		references: [subscriptionPlans.id]
	}),
}));

export const payloadPreferencesRelsRelations = relations(payloadPreferencesRels, ({one}) => ({
	payloadPreference: one(payloadPreferences, {
		fields: [payloadPreferencesRels.parentId],
		references: [payloadPreferences.id]
	}),
	user: one(users, {
		fields: [payloadPreferencesRels.usersId],
		references: [users.id]
	}),
}));

export const payloadPreferencesRelations = relations(payloadPreferences, ({many}) => ({
	payloadPreferencesRels: many(payloadPreferencesRels),
}));

export const ordersOrderItemsRelations = relations(ordersOrderItems, ({one}) => ({
	order: one(orders, {
		fields: [ordersOrderItems.parentId],
		references: [orders.id]
	}),
}));