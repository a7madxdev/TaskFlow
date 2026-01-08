"use client";

import { ChevronLeft, Home, LogOut } from "lucide-react";
import Avatar from "./Avatar";
import { signOutAction } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <nav
      className={`lg:w-full flex flex-col bg-dark text-white rounded-xl py-4 overflow-hidden fixed md:relative inset-y-2 md:inset-0 z-9 duration-400 ${isExpanded ? "w-52" : "w-12"}`}
    >
      <h1
        className={`font-medium text-lg text-first px-3 mb-1 duration-300 ${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
      >
        TaskFlow
      </h1>
      <button
        className={`absolute size-6 bg-light place-items-center text-white lg:hidden rounded-full top-4.5 duration-400 ${isExpanded ? "rotate-0 left-[calc(100%-32px)]" : "rotate-180 left-3"}`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <ChevronLeft size={20} />
      </button>
      <hr className="border-light/15 mx-auto w-40 mb-1" />
      <ul className="flex-1 px-2">
        <li>
          <Link
            href="/home"
            className="flex items-center h-9 text-sm bg-primary rounded-sm px-2"
          >
            <span className="mr-2">
              <Home size={15} />
            </span>
            <span
              className={`duration-300 ${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
            >
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/groups"
            className="flex items-center h-9 rounded-sm px-2 text-sm text-slate-400 hover:text-white duration-200"
          >
            <span className="mr-2">
              <Home size={15} />
            </span>
            <span
              className={`duration-300 ${isExpanded ? "opacity-100" : "opacity-0 lg:opacity-100"}`}
            >
              Groups
            </span>
          </Link>
        </li>
      </ul>
      <div className="px-2.5 h-8 flex items-center">
        <Avatar
          className="min-w-7"
          src={"/images/profile.png"}
          alt={"profile"}
          size={28}
        />
        <label className="text-[13px] flex-1 px-2.5 truncate text-white min-w-0">
          a7madxdev
        </label>
        {/* // TODO: Use `Alert` in signing out with `useActionState` */}
        <button className="" onClick={signOutAction}>
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
