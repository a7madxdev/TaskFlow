"use client";

import InputField from "@/components/InputField";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const CodeStage = ({
  code,
  setCode,
  codeTimer,
  realTimeFormat,
  sendNewCode,
  loading,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  codeTimer: number;
  realTimeFormat: (t: number) => string;
  sendNewCode: () => void;
  loading: boolean;
}) => {
  const codeRef = useRef(null);
  useEffect(() => {
    if (codeRef.current) {
      (codeRef.current as HTMLInputElement).focus();
    }
  }, []);
  return (
    <>
      <p className="text-sm text-center mb-2 text-gray-600">
        Validation code has been send to your email
      </p>
      <label className="text-sm">Code</label>
      <InputField
        type={"number"}
        placeholder="Validation code"
        value={code}
        setValue={setCode}
        ref={codeRef}
      />
      <div
        className={twMerge(
          "mt-2 text-sm",
          loading ? "opacity-50 pointer-events-none" : ""
        )}
      >
        {codeTimer > 0 ? (
          <p>Send a new code after {realTimeFormat(codeTimer)}</p>
        ) : (
          <p
            className="cursor-pointer underline text-blue-500"
            onClick={sendNewCode}
          >
            Send a new code
          </p>
        )}
      </div>
    </>
  );
};

export default CodeStage;
