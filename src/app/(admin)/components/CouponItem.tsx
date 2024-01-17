import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { couponFormSchemaType } from "../../../../drizzle/migrations/schema";

type Props = {
  id: string;
  label: string;
  name:
    | "merchant"
    | "coupon"
    | "tagline"
    | "description"
    | "expiry"
    | "exclusive"
    | "trending"
    | "position"
    | "category"
    | "link";
  form: UseFormReturn<couponFormSchemaType>;
  inputType?: string;
  radioValue?: {
    value: string;
    id: string;
  }[];
  isDate?: boolean;
  isDropdown?: boolean;
  dropdownValue?: {
    value: string;
    id: string;
  }[];
};

export default function CouponItem({
  id,
  name,
  label,
  inputType,
  form,
  radioValue,
  isDate,
  isDropdown,
  dropdownValue,
}: Props) {
  return inputType === "radio" ? (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="col-span-5 flex items-center gap-5 space-y-0">
          <FormLabel htmlFor={id} className="text-right">
            {label}
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className=""
            >
              <RadioGroup
                className="flex"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {
                  // @ts-ignore
                  radioValue.map((item) => (
                    <FormItem
                      className="flex items-center space-y-0 space-x-3"
                      key={item.id}
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} id={item.id} />
                      </FormControl>
                      <FormLabel htmlFor={item.id}>{item.value}</FormLabel>
                    </FormItem>
                  ))
                }
              </RadioGroup>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="col-span-5">
          <FormLabel htmlFor={id} className="text-right mt-1 ">
            {label}
          </FormLabel>
          {isDropdown ? (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={label} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {
                  // @ts-ignore
                  dropdownValue.map((item) => (
                    <SelectItem value={item.value} id={item.id} key={item.id}>
                      {item.value}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          ) : (
            <FormControl>
              {inputType === "textarea" ? (
                <Textarea id={id} className="w-full" {...field} />
              ) : isDate ? (
                <Input id={id} type="date" className="col-span-4" {...field} />
              ) : (
                <Input id={id} className="col-span-4" {...field} />
              )}
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
