"use client";
import { useEffect, useState } from "react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@radix-ui/react-avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";
import { couponType } from "../../../../drizzle/migrations/schema";

type Props = {
  open: boolean;
  couponId: number;
  setToggle: () => void;
};

export function EditCoupon({ open, setToggle, couponId }: Props) {
  const toast = useToast();
const [storeData, setCouponData] = useState<couponType>({
    couponId: 0,
    name: "",
    description: "",
    link: "",
    tagline: "",
    exclusive: false,
    created_at: new Date(Date.now()).toISOString(),
    updated_at: new Date(Date.now()).toISOString(),
    expire_date: "", // Add missing property
    used_times: "", // Add missing property
    discount_number: "", // Add missing property
    discountId: 0, // Add missing property
    storeId: 0, // Add missing property
    subCategoryId: 0, // Add missing property
});
  
  const [isLoading, setIsLoading] = useState(false);

  const getSingleCoupon = async () => {
    const data = await fetch(`/api/store/?id=${couponId}&filter=all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setCouponData(response.message[0]);
    console.log(response.message[0]);
  };

  useEffect(() => {
    getSingleCoupon();
  }, [couponId]);

  // const form = useForm<z.infer<typeof couponFormSchema>>({
  //   resolver: zodResolver(couponFormSchema),
  //   values: {
  //       merchant: storeData.merchant,
  //       description: storeData.description,
  //       tagline: storeData.tagline,
  //       link: storeData.link,
  //      // position: storeData.position,
  //       category: storeData.category,
  //       expiry: storeData.expiry,
  //       //exclusive: storeData.exclusive,
  //       //trending: storeData.trending,


  //       },
  //   }
  //   );

  // async function onSubmit(values: z.infer<typeof couponFormSchema>) {
  //   setIsLoading(true);
  //   const postData = await fetch("/api/store", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     cache: "no-cache",
  //     body: JSON.stringify(values),
  //   });
  //   const response = await postData.json();
  //   setIsLoading(false);
  //   if (response.status === 201) {
  //   //   toast({
  //   //     variant: "success",
  //   //     title: "Success",
  //   //     description: response.statusText,
  //   //   });
  //     form.resetField("logo");
  //     form.resetField("favImage");
  //     form.reset();
  //   }
  // }


    return (
        <Dialog open={open} onOpenChange={() => setToggle()}>
      {/* <DialogContent className="min-w-[55%] ">
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
                  <EditCouponItem
                    id={"merchant"}
                    label={"Merchant"}
                    name={"marchant"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"description"}
                    label={"Description"}
                    name={"description"}
                    form={form}
                    inputType={"textarea"}
                  />
                </div>
                <div className="grid grid-cols-6 items-start gap-4">
                  <EditItem
                    id={"about"}
                    label={"About Coupon"}
                    name={"about"}
                    form={form}
                    inputType={"textarea"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"url"}
                    label={"Coupon URL"}
                    name={"url"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"directory"}
                    label={"Directory"}
                    name={"directory"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"lpCode"}
                    label={"LP Code"}
                    name={"lpCode"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"tcode"}
                    label={"Traffic Code"}
                    name={"trafficCode"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"shipping"}
                    label={"Shipping Info"}
                    name={"shipping"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <Label htmlFor="logo" className="text-right">
                    Image/Logo
                  </Label>
                  <Input
                    type="file"
                    id="logo"
                    onChange={handleLogoFileChange}
                    className="col-span-4"
                  />
                  <FormMessage />
                </div>
                <div className="grid grid-cols-6 items-start gap-4">
                  <Avatar className="col-start-5 col-span-1">
                    <AvatarImage
                      className="min-h-24 rounded-lg"
                      src={selectedLogoFile ? selectedLogoFile : ""}
                      alt=""
                    />
                    <AvatarFallback className="min-h-24 rounded-lg">
                      Logo
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="grid grid-cols-6 items-center gap-4 my-2">
                  <EditItem
                    id={"popular"}
                    label={"Popular"}
                    name={"popular"}
                    form={form}
                    inputType={"radio"}
                    radioValue={[
                      { value: "true", id: "Yes" },
                      { value: "false", id: "No" },
                    ]}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"favorite"}
                    label={"Favorite"}
                    name={"favorite"}
                    form={form}
                    inputType={"radio"}
                    radioValue={[
                      { value: "true", id: "Yes" },
                      { value: "false", id: "No" },
                    ]}
                  />
                </div>
                {isFavoriteChecked && (
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-6 items-center gap-4">
                      <Label htmlFor="tcode" className="text-right">
                        Favorite Image
                      </Label>
                      <Input
                        id="tcode"
                        className="col-span-4"
                        type="file"
                        onChange={handleFavChange}
                      />
                    </div>
                    <div className="grid grid-cols-6 items-center gap-4">
                      <Avatar className="col-start-5 col-span-1">
                        <AvatarImage
                          className="min-h-24 rounded-lg"
                          src={selectedFavFile ? selectedFavFile : ""}
                          alt=""
                        />
                        <AvatarFallback className="min-h-24 rounded-lg">
                          Logo
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="mr-6">
                {isLoading ? (
                  <Button className="min-w-[25%]" type="submit" disabled>
                    <Loader size={17} className="animate-spin mr-1" /> Updating...
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
      </DialogContent> */}
    </Dialog>
    );

}
