import Link from "next/link";
import React, { ElementType } from "react";

type Props = {
  name: string;
  href: string;
  Icon: ElementType;
  toggle: boolean
};

export default function SidebarItem({ name, href, Icon,toggle }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 font-semibold tracking-[4px] text-[18px] w-full px-4 py-2 bg-[#245036] hover:bg-[#0f2217] my-1 animate-in"
    >
      <span>
        <Icon size={22} className="font-bold" />
      </span>
      <span className={toggle ? 'hidden' : ''}>{name}</span>
    </Link>
  );
}
