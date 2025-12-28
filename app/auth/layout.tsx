import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-xl font-medium mb-3">TaskFlow</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
