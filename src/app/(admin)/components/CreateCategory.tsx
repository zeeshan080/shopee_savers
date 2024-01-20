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
import { categoryFormSchema, categoryFormSchemaType } from "../../../../drizzle/migrations/schema";

type Props = {
  open: boolean;
  setToggle: () => void;
};

export function CreateCategory({ open, setToggle }: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<categoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
  });

  async function onSubmit(values: categoryFormSchemaType) {
    setIsLoading(true);
    const postData = await fetch("/api/categories", {
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
      <DialogContent className="min-w-[45%] ">
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
                <DialogDescription>
                  Make changes to your Category here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-3">
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
                          Category Name
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
