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
  discountType,
  storeFormSchemaType,
  subCategoryType,
} from "../../../../drizzle/migrations/schema";
import CouponItem from "./CouponItem";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

type Props = {
  open: boolean;
  setToggle: () => void;
};

export function CreateCoupon({ open, setToggle }: Props) {
  const [store, setStore] = useState<storeFormSchemaType[]>([]);
  const [subCategory, setSubCategory] = useState<subCategoryType[]>([]);
  const [discount, setDiscount] = useState<discountType[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getStoreData = async () => {
    const data = await fetch("/api/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setStore(response.message);
  };
  const getDiscountData = async () => {
    const data = await fetch("/api/discount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setDiscount(response.message);
  };
  const getSubCategoryData = async () => {
    const data = await fetch("/api/sub-categories", {
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
    getStoreData();
    getSubCategoryData();
    getDiscountData();
  }, []);

  const form = useForm<couponFormSchemaType>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      description: "",
      tagline: "",
      link: "",
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
  });

  async function onSubmit(values: z.infer<typeof couponFormSchema>) {
    console.log("values--> ", values);
    
    setIsLoading(true);
    const postData = await fetch("/api/coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(values),
    });
    const response = await postData.json();
    setIsLoading(false);
    if (response.status === 201) {
      toast({
        variant: "success",
        title: "Success",
        description: response.statusText,
      });
      form.reset();
      window.location.reload();
    }
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
                    id={"storeId"}
                    label={"Merchant"}
                    name={"storeId"}
                    form={form}
                    isDropdown={true}
                    dropdownValue={store.map((item) => {
                      return {
                        id: String(item.storeId),
                        value: `${item.storeId} - ${item.name}`,
                      };
                    })}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"name"}
                    label={"Coupon Name"}
                    name={"name"}
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
                    name={"expire_date"}
                    form={form}
                    inputType={"input"}
                    isDate={true}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"used_times"}
                    label={"Used Times"}
                    name={"used_times"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"discountId"}
                    label={"Discount Type"}
                    name={"discountId"}
                    form={form}
                    isDropdown={true}
                    dropdownValue={discount.map((item) => {
                      return {
                        id: String(item.discountId),
                        value: `${item.discountId} - ${item.name}`,
                      };
                    })}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"discount_number"}
                    label={"Discount Number"}
                    name={"discount_number"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <CouponItem
                    id={"subCategoryId"}
                    label={"Sub Category"}
                    name={"subCategoryId"}
                    form={form}
                    isDropdown={true}
                    dropdownValue={subCategory.map((item) => {
                      return {
                        id: String(item.categoryId),
                        value: `${item.categoryId} - ${item.name}`,
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
              {isLoading ? (
                  <Button className="min-w-[25%]" type="submit" disabled>
                    <Loader size={17} className="animate-spin mr-1" /> Saving...
                  </Button>
                ) : (
                  <Button className="min-w-[25%]" type="submit">
                    Save changes
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
