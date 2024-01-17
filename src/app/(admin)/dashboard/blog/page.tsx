"use client";
import React from "react";
import { DataTable } from "../../components/DataTable";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2, MoreHorizontal } from "lucide-react";
import { blogType } from "../../../../../drizzle/migrations/schema";


type Props = {};

export default function Blog({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [blogId, setBlogId] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [blogData, setBlogData] = React.useState<blogType[]>([]);
  const getBlogData = async () => {
    setIsLoading(true);
    const data = await fetch("/api/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const response = await data.json();
    setBlogData(response.message);
    setIsLoading(false);
  };
  React.useEffect(() => {
    getBlogData();
  }, []);

  const columns: ColumnDef<blogType>[] = [
    {
      id: "blogId",
      header: "Blog Id",
      accessorKey: "blogId",
    },
    {
      id: "title",
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="font-bold">{row.getValue("title")}</div>
      ),
    },
    {
      id: "image",
      header: "Image",
      accessorKey: "image",
      cell: ({ row }) => (
        <div className="w-16 h-16">
          <Image
            className="rounded-md"
            src={row.getValue("image")}
            alt=""
            width={80}
            height={80}
          />
        </div>
      ),
    },
    {
      id: "created_at",
      header: "Created Date",
      accessorKey: "created_at",
      cell: ({ row }) => (
        <div>{row.getValue("created_at")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => {
        const blogId = row.getValue("blogId") as number;
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
              <DropdownMenuItem onClick={() => handleEdit(blogId)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const handleEdit = (blogId?: number) => {
    blogId && setBlogId(blogId);
    setOpen(!open);
  };
  return (
    <main>
      <Toaster />
      <section className="m-4">
        <div className="flex justify-end">
          <Button onClick={() => handleEdit()}>Add New Blog</Button>
        </div>
        {
          isLoading ? 
          (<div className="flex justify-center items-center w-full h-full min-h-[70vh]">
            <Loader2 className="animate-spin" size={38}/>
          </div>):
          (<DataTable data={blogData} columns={columns} />)
        }
      </section>
    </main>
  );
}
