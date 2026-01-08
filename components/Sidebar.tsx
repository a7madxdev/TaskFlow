"use client";

import { ChevronLeft, Home, LogOut, UsersRound } from "lucide-react";
import Avatar from "./Avatar";
import { signOutAction } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { usePathname } from "next/navigation";

const Sidebar = ({ user }: { user: any }) => {
  const { username, image } = user;
  const [isExpanded, setIsExpanded] = useState(false);
  const { showAlert } = useAlert();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", icon: Home, href: "/home" },
    { name: "Groups", icon: UsersRound, href: "/groups" },
  ];

  function onSignOut() {
    showAlert({
      title: "Sign out",
      message: "Sign out of this device ?",
      btnText: "Sign Out",
      btnStyle: "danger",
      onConfirm: () => signOutAction(),
      overlay: {
        theme: "dark",
      },
    });
  }
  return (
    <nav
      className={`lg:w-full flex flex-col bg-dark text-white rounded-xl py-4 overflow-hidden fixed md:relative inset-y-2 md:inset-0 z-5 duration-400 ${isExpanded ? "w-52" : "w-12"}`}
    >
      <h1
        className={`font-medium text-lg text-first px-3 mb-1 duration-300 ${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
      >
        TaskFlow
      </h1>
      <button
        className={`absolute size-6 bg-light place-items-center text-white lg:hidden rounded-full top-4.5  ${isExpanded ? "rotate-0 left-[calc(100%-32px)]" : "rotate-180 left-[calc(100%-36px)]"}`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <ChevronLeft size={20} />
      </button>
      <hr className="border-light/15 mx-auto w-40 mb-1" />
      <ul className="flex-1 px-2">
        {navLinks.map((link, i) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <li key={i}>
              <Link
                href={link.href}
                className={`flex items-center h-9 text-sm rounded-sm px-2 text-slate-400 hover:text-white duration-300 ${isActive ? "bg-primary text-white" : ""}`}
              >
                <span className="mr-2">
                  <Icon size={15} />
                </span>
                <span
                  className={`${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="px-2.5 h-8 flex items-center">
        <Avatar className="min-w-7" src={image} alt={"profile"} size={28} />
        <label className="text-[13px] flex-1 px-2.5 truncate text-white min-w-0">
          {username}
        </label>
        {/* // TODO: Use `Alert` in signing out with `useActionState` */}
        <button className="" onClick={onSignOut}>
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
