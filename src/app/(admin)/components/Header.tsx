import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { LogOut, User } from "lucide-react";
  
  type Props = {
    
  };
  
  export default function Header({}: Props) {
    return (
      <header className="flex justify-end items-center p-3 bg-[#397250] text-white">
        <div className="px-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><User size={17} className="mr-2"/> Admin</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogOut size={17} className="mr-2"/> LogOut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }
  