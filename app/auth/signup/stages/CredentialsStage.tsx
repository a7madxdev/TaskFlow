"use client";

import InputField from "@/components/InputField";
import Tip from "@/components/Tip";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface CredentialsType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const CredentialsStage = ({
  username,
  setUsername,
  password,
  setPassword,
}: CredentialsType) => {
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      (usernameRef.current as HTMLInputElement).focus();
    }
  }, []);
  return (
    <>
      <p className="text-sm text-center mb-2 text-gray-600">
        Create your username and your password
      </p>
      <label className="text-sm">Username</label>
      <InputField
        type={"text"}
        placeholder="@qw_e1333"
        value={username}
        setValue={setUsername}
        ref={usernameRef}
        onFocus={() => setUsernameFocus(true)}
        onBlur={() => setUsernameFocus(false)}
      />
      {usernameFocus && (
        <Tip content="Username starts with a letter, the rest are letters, numbers and underscores, 6-30 characters long" />
      )}
      <label className="text-sm">Password</label>
      <InputField
        type={"password"}
        placeholder="Q?94voL!0@m"
        value={password}
        setValue={setPassword}
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
      />
      {passwordFocus && (
        <Tip content="Password must contain at least one small letter, one capital letter, one number and one special character within [@ $ ! % * ? &], 8 - 16 characters long" />
      )}
    </>
  );
};

export default CredentialsStage;
