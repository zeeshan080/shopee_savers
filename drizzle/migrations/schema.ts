import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, boolean, date,numeric } from "drizzle-orm/pg-core";
import * as z from "zod";

export const store = pgTable("store", {
  storeId: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  about: text("about").notNull(),
  url: text("url").notNull(),
  shipping: text("shipping").notNull(),
  lpCode: text("lpCode").notNull(),
  trafficCode: text("trafficCode").notNull(),
  logo: text("logo").notNull(),
  popular: boolean("popular").notNull(),
  favorite: boolean("favorite").notNull(),
  favoriteImage: text("favoriteImage"),
  created_at: date("created_at").notNull(),
  updated_at: date("updated_at").notNull(),
  directoryId: serial("directoryId").references(() => directory.directoryId),
});

export const directory = pgTable("directory", {
  directoryId: serial("id").primaryKey(),
  name: text("name").notNull()
});

export const coupon = pgTable("coupon", {
  couponId: serial("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  expire_date: date("expire_date").notNull(),
  used_times: numeric("used_times").notNull(),
  discount_number: numeric("discount_number").notNull(),
  exclusive: boolean("exclusive").notNull(),
  link: text("link").notNull(),
  discountId: serial("discountId").references(() => discount.discountId),
  storeId: serial("storeId").references(() => store.storeId),
  subCategoryId: serial("subCategoryId").references(() => subCategory.subCategoryId),
  created_at: date("created_at").notNull(),
  updated_at: date("updated_at").notNull(),
});

export const discount = pgTable("discount", {
  discountId: serial("id").primaryKey(),
  name: text("name").notNull(),
  created_at: date("created_at").notNull(),
  updated_at: date("updated_at").notNull(),
});

export const blog = pgTable("blog", {
  blogId: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  created_at: date("created_at").notNull(),
  updated_at: date("updated_at").notNull(),
});

export const category = pgTable("category", {
  categoryId: serial("id").primaryKey(),
  name: text("name").notNull(),
  created_at: date("created_at").notNull(),
  updated_at: date("updated_at").notNull(),
});

export const subCategory = pgTable("subCategory", {
  subCategoryId: serial("id").primaryKey(),
  name: text("name").notNull(),
  created_at: date("created_at").notNull(),
  updated_at: date("updated_at").notNull(),
  categoryId: serial("categoryId").references(() => category.categoryId),
});



export const storeFormSchema = z.object({
  storeId: z.string().min(1, {
    message: "id must be at least 1 characters.",
  }),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  directoryId: z.string().min(1, {
    message: "directory must be at selected.",
  }),
  about: z.string().min(2, {
    message: "about must be at least 2 characters.",
  }),
  url: z.string().min(2, {
    message: "url must be at least 2 characters.",
  }),
  lpCode: z.string().min(2, {
    message: "code must be at least 2 characters.",
  }),
  trafficCode: z.string().min(2, {
    message: "tcode must be at least 2 characters.",
  }),
  shipping: z.string().min(2, {
    message: "shipping must be at least 2 characters.",
  }),
  popular: z.enum(["true", "false"], {
    required_error: "You need to select a popluar type.",
  }),
  favorite: z.enum(["true", "false"], {
    required_error: "You need to select a favorite type.",
  }),
  logo: z.string().min(2, {
    message: "logo must be at selected.",
  }),
  favoriteImage: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const couponFormSchema = z.object({
  storeId: z.string().min(1, {
    message: "merchant name must be at least 1 characters.",
  }),
  name: z.string().min(2, {
    message: "coupon must be at least 2 characters.",
  }),
  tagline: z.string().min(2, {
    message: "tagline must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  expire_date: z.string({
    required_error: "expiry date is required.",
  }),
  used_times: z.string().min(1, {
    message: "use times must be at least 1 characters.",
  }),
  discount_number: z.string().min(1, {
    message: "discount number must be at least 1 characters.",
  }),
  discountId: z.string().min(1, {
    message: "discount type must be at least 1 characters.",
  }),
  link: z.string().min(2, {
    message: "link must be at least 2 characters.",
  }),
  position: z.string().min(1, {
    message: "position can be only 1 character 1,2,3.",
  }),
  exclusive: z.enum(["yes", "no"], {
    required_error: "You need to select a popluar type.",
  }),
  trending: z.enum(["yes", "no","none"], {
    required_error: "You need to select a favorite type.",
  }),
  subCategoryId: z.string().min(1, {
    message: "Sub Category must be at selected.",
  }),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

export const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const subCategoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  created_at: z.string().optional(),
  updated_at:z.string().optional()
});


export const blogFormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "content must be at least 2 characters.",
  }),
  image: z.string().min(2, {
    message: "image must be at selected.",
  }),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type storeFormSchemaType = z.infer<typeof storeFormSchema>;
export type couponFormSchemaType = z.infer<typeof couponFormSchema>;
export type categoryFormSchemaType = z.infer<typeof categoryFormSchema>;
export type subCategoryFormSchemaType = z.infer<typeof subCategoryFormSchema>;
export type blogFormSchemaType = z.infer<typeof blogFormSchema>;


export type blogType = InferSelectModel<typeof blog>
export type storeType = InferSelectModel<typeof store>
export type directoryType = InferSelectModel<typeof directory>
export type couponType = InferSelectModel<typeof coupon>
export type discountType = InferSelectModel<typeof discount>
export type categoryType = InferSelectModel<typeof category>
export type subCategoryType = InferSelectModel<typeof subCategory>
