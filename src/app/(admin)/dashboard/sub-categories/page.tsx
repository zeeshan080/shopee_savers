"use client";
import React from "react";
import { DataTable } from "../../components/DataTable";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2, MoreHorizontal } from "lucide-react";
import { couponType } from "../../../../../drizzle/migrations/schema";
import { EditCoupon } from "../../components/EditCoupon";
import { CreateSubCategory } from "../../components/CreateSubCategory";

type Props = {};

export default function SubCategories({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [couponId, setCouponId] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [categoryData, setCouponData] = React.useState<couponType[]>([]);
  const getCouponData = async () => {
    setIsLoading(true);
    const data = await fetch("/api/sub-categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setCouponData(response.message);
    setIsLoading(false);
  };
  React.useEffect(() => {
    getCouponData();
  }, []);

  const columns: ColumnDef<couponType>[] = [
    {
      id: "subCategoryId",
      header: "Sub Category Id",
      accessorKey: "subCategoryId",
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
      id: "created_at",
      header: "Created At",
      accessorKey: "created_at",
      cell: ({ row }) => (
        <div >{row.getValue("created_at")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => {
        const couponId = row.getValue("couponId") as number;
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
              <DropdownMenuItem onClick={() => handleEdit(couponId)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const handleEdit = (couponId?: number) => {
    couponId && setCouponId(couponId);
    setOpen(!open);
  };
  return (
    <main>
      <Toaster />
      <section className="m-4">
        {couponId ? (
          <EditCoupon open={open} setToggle={handleEdit} couponId={couponId} />
        ) : (
          <CreateSubCategory open={open} setToggle={handleEdit} />
        )}
        <div className="flex justify-end">
          <Button onClick={() => handleEdit()}>Add New Sub Category</Button>
        </div>
        {
          isLoading ? 
          (<div className="flex justify-center items-center w-full h-full min-h-[70vh]">
            <Loader2 className="animate-spin" size={38}/>
          </div>):
          (<DataTable data={categoryData} columns={columns} />)
        }
      </section>
    </main>
  );
}
