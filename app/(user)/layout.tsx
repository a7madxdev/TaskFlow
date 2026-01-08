import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <div className="h-dvh w-dvw grid grid-cols-[32px_1fr] xm:grid-cols-[auto_1fr] lg:grid-cols-[200px_1fr] gap-6 p-2 bg-slate-50 overflow-hidden">
      <Sidebar user={session?.user} />
      <main className="overflow-y-scroll col-start-2">{children}</main>
    </div>
  );
};

export default layout;
