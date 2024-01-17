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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import EditItem from "./StoreItem";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { directoryType, storeFormSchema, storeFormSchemaType } from "../../../../drizzle/migrations/schema";

type Props = {
  open: boolean;
  setToggle: () => void;
};

export function CreateStore({ open, setToggle }: Props) {
  const { toast } = useToast();
  const [selectedLogoFile, setSelectedLogoFile] = useState<string>();
  const [selectedFavFile, setSelectedFavFile] = useState<string>();
  const [isFavoriteChecked, setIsFavoriteChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [directory, setDirectory] = useState<directoryType[]>([]);

  const getDirectory = async () => {
    const data = await fetch("/api/directory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setDirectory(response.message);
  };
  useEffect(() => {
    getDirectory();
  }, []);

  const form = useForm<storeFormSchemaType>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      about: "",
      url: "",
      lpCode: "",
      trafficCode: "",
      shipping: "",
      logo: "",
      favoriteImage: "",
      created_at: new Date(Date.now()).toISOString() ,
      updated_at: new Date(Date.now()).toISOString(),
    },
  });

  useEffect(() => {
    form.watch("favorite") === "true" && setIsFavoriteChecked(true);
  }, [form.watch("favorite")]);

  async function onSubmit(values: z.infer<typeof storeFormSchema>) {
    setIsLoading(true);
    const postData = await fetch("/api/store", {
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
      form.resetField("directoryId");
      form.resetField("logo");
      form.resetField("favoriteImage");
      form.reset();
      window.location.reload();
    }
  }

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setSelectedLogoFile(base64String);
        form.setValue("logo", base64String);
      };
      reader.readAsDataURL(file);
    }
    // file && setSelectedLogoFile(file);
  };
  const handleFavChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setSelectedFavFile(base64String);
        form.setValue("favoriteImage", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setToggle()}>
      <DialogContent className="min-w-[55%] ">
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Create Store</DialogTitle>
                <DialogDescription>
                  Make changes to your Store here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-3">
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"merchant"}
                    label={"Merchant"}
                    name={"name"}
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
                    label={"About Store"}
                    name={"about"}
                    form={form}
                    inputType={"textarea"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <EditItem
                    id={"url"}
                    label={"Store URL"}
                    name={"url"}
                    form={form}
                    inputType={"input"}
                  />
                </div>
                <div className="grid grid-cols-6 items-center gap-4">
                  <FormField
                    control={form.control}
                    name="directoryId"
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormLabel>Directory</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Directory for Store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="col-span-5">
                            {directory.map((item: directoryType, index: number) => (
                              <SelectItem
                                key={index}
                                value={String(item.directoryId)}
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
