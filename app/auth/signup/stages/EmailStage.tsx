"use client";

import InputField from "@/components/InputField";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const EmailStage = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
  const emailRef = useRef(null);
  useEffect(() => {
    if (emailRef.current) {
      (emailRef.current as HTMLInputElement).focus();
    }
  }, []);
  return (
    <>
      <p className="text-sm text-center mb-2 text-gray-600">
        Enter your email adress
      </p>
      <label className="text-sm">Email</label>
      <InputField
        type={"email"}
        placeholder="Email adress"
        value={email}
        setValue={setEmail}
        ref={emailRef}
      />
    </>
  );
};

export default EmailStage;
