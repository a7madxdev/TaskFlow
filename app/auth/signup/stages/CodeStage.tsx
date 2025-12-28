"use client";

import InputField from "@/components/InputField";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const CodeStage = ({
  code,
  setCode,
  codeTimer,
  realTimeFormat,
  sendNewCode,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  codeTimer: number;
  realTimeFormat: (t: number) => string;
  sendNewCode: () => void;
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
      <div className="mt-2 text-sm">
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
