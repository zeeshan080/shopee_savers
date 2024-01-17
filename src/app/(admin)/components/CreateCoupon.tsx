"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import {
  couponFormSchema,
  couponFormSchemaType,
  subCategoryType,
} from "../../../../drizzle/migrations/schema";
import CouponItem from "./CouponItem";

type Props = {
  open: boolean;
  setToggle: () => void;
};

export function CreateCoupon({ open, setToggle }: Props) {
  const [subCategory, setSubCategory] = useState<subCategoryType[]>([]);

  const getSubCategoryData = async () => {
    const data = await fetch("/api/subcategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setSubCategory(response.message);
  };
  useEffect(() => {
    getSubCategoryData();
  }, []);
  const form = useForm<couponFormSchemaType>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      merchant: "",
      description: "",
      tagline: "",
      link: "",
    },
  });

  function onSubmit(values: z.infer<typeof couponFormSchema>) {
    console.log("values -->", values);
  }

  return (
    <Dialog open={open} onOpenChange={() => setToggle()}>
      <DialogContent className="min-w-[55%] ">
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Edit Coupon</DialogTitle>
                <DialogDescription>
                  Make changes to your Coupon here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-3">
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"merchant"}
                    label={"Merchant"}
                    name={"merchant"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"coupon"}
                    label={"Coupon"}
                    name={"coupon"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"tagline"}
                    label={"Tagline"}
                    name={"tagline"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-start gap-4">
                  <CouponItem
                    id={"description"}
                    label={"Description"}
                    name={"description"}
                    form={form}
                    inputType={"textarea"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"expiry"}
                    label={"Expiration"}
                    name={"expiry"}
                    form={form}
                    inputType={"input"}
                    isDate={true}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"category"}
                    label={"Sub Category"}
                    name={"category"}
                    form={form}
                    isDropdown={true}
                    dropdownValue={subCategory.map((item) => {
                      return {
                        value: item.name,
                        id: `${item.name} - ${item.name}`,
                      };
                    })}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4 my-2">
                  <CouponItem
                    id={"exclusive"}
                    label={"Exclusive"}
                    name={"exclusive"}
                    form={form}
                    inputType={"radio"}
                    radioValue={[
                      { value: "yes", id: "yes" },
                      { value: "no", id: "no" },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"trending"}
                    label={"Trending"}
                    name={"trending"}
                    form={form}
                    inputType={"radio"}
                    radioValue={[
                      { value: "yes", id: "yes" },
                      { value: "no", id: "no" },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"position"}
                    label={"Position"}
                    name={"position"}
                    form={form}
                    isDropdown={true}
                    dropdownValue={[
                      { value: "1", id: "1" },
                      { value: "2", id: "2" },
                      { value: "3", id: "3" },
                      { value: "4", id: "4" },
                      { value: "5", id: "5" },
                      { value: "6", id: "6" },
                      { value: "7", id: "7" },
                      { value: "8", id: "8" },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"url"}
                    label={"Coupon Link"}
                    name={"link"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
              </div>
              <DialogFooter className="mr-6">
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
