"use client";
import React from "react";
import { DataTable } from "../../components/DataTable";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2, MoreHorizontal } from "lucide-react";
import { storeType } from "../../../../../drizzle/migrations/schema";
import { EditStore } from "../../components/EditStore";
import { CreateStore } from "../../components/CreateStore";

type Props = {};

export default function Store({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [storeId, setStoreId] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [storeData, setStoreData] = React.useState<storeType[]>([]);
  const getStoreData = async () => {
    setIsLoading(true);
    const data = await fetch("/api/store?filter=admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setStoreData(response.message);
    setIsLoading(false);
  };
  React.useEffect(() => {
    getStoreData();
  }, []);

  const columns: ColumnDef<storeType>[] = [
    {
      id: "storeId",
      header: "Store Id",
      accessorKey: "storeId",
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="font-bold">{row.getValue("name")}</div>
      ),
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
    },
    {
      id: "about",
      header: "About",
      accessorKey: "about",
    },
    {
      id: "logo",
      header: "Logo",
      accessorKey: "logo",
      cell: ({ row }) => (
        <div className="w-16 h-16">
          <Image
            className="rounded-md"
            src={row.getValue("logo")}
            alt=""
            width={80}
            height={80}
          />
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => {
        const storeId = row.getValue("storeId") as number;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(storeId)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const handleEdit = (storeId?: number) => {
    storeId && setStoreId(storeId);
    setOpen(!open);
  };
  return (
    <main>
      <Toaster />
      <section className="m-4">
        {storeId ? (
          <EditStore open={open} setToggle={handleEdit} id={storeId} />
        ) : (
          <CreateStore open={open} setToggle={handleEdit} />
        )}
        <div className="flex justify-end">
          <Button onClick={() => handleEdit()}>Add New Store</Button>
        </div>
        {
          isLoading ? 
          (<div className="flex justify-center items-center w-full h-full min-h-[70vh]">
            <Loader2 className="animate-spin" size={38}/>
          </div>):
          (<DataTable data={storeData} columns={columns} />)
        }
      </section>
    </main>
  );
}
