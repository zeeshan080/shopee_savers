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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { blogFormSchema, blogFormSchemaType } from "../../../../drizzle/migrations/schema";

type Props = {
  open: boolean;
  setToggle: () => void;
};

export function CreateBlog({ open, setToggle }: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlogFile, setSelectedBlogFile] = useState<string>();

  const form = useForm<blogFormSchemaType>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    },
  });

  const handleBlogFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        alert("Please upload a valid image file");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        //const imageWithType = `data:image/${file.type};base64,${base64String}`;
        setSelectedBlogFile(base64String);
        form.setValue("image", base64String);
      };
      reader.readAsDataURL(file);
    }
    // file && setSelectedLogoFile(file);
  };

  async function onSubmit(values: z.infer<typeof blogFormSchema>) {
    setIsLoading(true);
    const postData = await fetch("/api/blog", {
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
                <DialogTitle>Create Blog</DialogTitle>
                <DialogDescription>
                  Make changes to your Blog here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-3">
                <div className="grid grid-cols-6 items-center gap-4">
                  <FormField
                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormLabel
                          htmlFor={"title"}
                          className="text-right mt-1 "
                        >
                          Blog Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={"title"}
                            className="col-span-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <FormField
                    control={form.control}
                    name={"content"}
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormLabel
                          htmlFor={"content"}
                          className="text-right mt-1 "
                        >
                          Blog Content
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            cols={30}
                            rows={10}
                            id={"content"}
                            className="col-span-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <Label htmlFor="logo" className="text-right">
                    Image/Logo
                  </Label>
                  <Input
                    type="file"
                    id="logo"
                    onChange={handleBlogFileChange}
                    className="col-span-4"
                  />
                  <FormMessage />
                </div>
                <div className="grid grid-cols-6 items-start gap-4">
                  <Avatar className="col-start-5 min-h-24 min-w-24 col-span-1">
                    <AvatarImage
                      className="min-h-24 rounded-md"
                      src={selectedBlogFile ? selectedBlogFile : ""}
                      alt=""
                    />
                    <AvatarFallback className="min-h-24 rounded-md">
                      Blog Image
                    </AvatarFallback>
                  </Avatar>
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
