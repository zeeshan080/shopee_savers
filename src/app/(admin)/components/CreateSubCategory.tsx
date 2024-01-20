"use client";
import { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { categoryFormSchemaType, categoryType, subCategoryFormSchema, subCategoryFormSchemaType } from "../../../../drizzle/migrations/schema";

type Props = {
  open: boolean;
  setToggle: () => void;
};

export function CreateSubCategory({ open, setToggle }: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<categoryType[]>([]);

  const getCategoryData = async () => {
    const data = await fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setCategory(response.message);
  };
  React.useEffect(() => {
    getCategoryData();
  }, []);

  const form = useForm<categoryFormSchemaType>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues: {
      name: "",
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
  });

  async function onSubmit(values: subCategoryFormSchemaType) {
    setIsLoading(true);
    const postData = await fetch("/api/sub-categories", {
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
                <DialogTitle>Create Sub Category</DialogTitle>
                <DialogDescription>
                  Make changes to your Sub Category here. Click save when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-3">
                <div className="grid grid-cols-6 items-center gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Category for Store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="col-span-5">
                            {category.map((item: categoryType, index: number) => (
                              <SelectItem
                                key={index}
                                value={String(item.categoryId)}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <FormField
                    control={form.control}
                    name={"name"}
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormLabel
                          htmlFor={"name"}
                          className="text-right mt-1 "
                        >
                          Sub Category Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={"name"}
                            className="col-span-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
