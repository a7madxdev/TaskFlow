import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/home");
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-xl font-medium mb-3">TaskFlow</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
