"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Tip from "@/components/Tip";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import z from "zod";
import CredentialsStage from "./stages/CredentialsStage";
import CodeStage from "./stages/CodeStage";
import EmailStage from "./stages/EmailStage";

const SignUpFlow = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState<"email" | "code" | "credentials">("email");
  const [codeTimer, setCodeTimer] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    let codeInterval: NodeJS.Timeout;
    if (stage === "code") {
      setCodeTimer(10);
      codeInterval = setInterval(() => {
        setCodeTimer((prev) => (prev > 0 ? prev - 1 : prev));
      }, 1000);
    }

    return () => clearInterval(codeInterval);
  }, [stage]);

  const realTimeFormat = (rawSeconds: number) => {
    const rawMinutes = rawSeconds / 60;
    const minutes = Math.floor(rawMinutes);
    const seconds = Math.round((rawMinutes - Math.floor(rawMinutes)) * 60);

    return `${minutes.toString().length === 2 ? minutes : "0" + minutes}:${
      seconds.toString().length == 2 ? seconds : "0" + seconds
    }`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (stage === "email") {
      const emailValidation = z
        .string()
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
          "Email not vaild"
        );

      const result = emailValidation.safeParse(email);
      if (!result.success) {
        setError(z.treeifyError(result.error).errors[0]);
      } else {
        setStage("code");
      }
    } else if (stage === "code") {
      const codeValidation = z
        .string()
        .min(6, "Enter valid code")
        .max(6, "Code can't be more than 6 digits");
      const result = codeValidation.safeParse(code);
      if (!result.success) {
        setError(z.treeifyError(result.error).errors[0]);
      } else {
        setStage("credentials");
      }
    } else if (stage === "credentials") {
      const credentialsValidation = z.object({
        username: z
          .string()
          .min(6, "Username must be 6 characters at least")
          .max(30, "Username can't be longer than 18 characters")
          .regex(/^[A-Za-z][A-Za-z0-9_]{5,29}$/, "Username isn't valid"),
        password: z
          .string()
          .min(8, "Password must be 8 characters at least")
          .regex(
            /^(?=.*[a-z])/,
            "Password must contain one small letter at least"
          )
          .regex(
            /^(?=.*[A-Z])/,
            "Password must contain one capital letter at least"
          )
          .regex(/^(?=.*\d)/, "Password must contain one number at least")
          .regex(
            /^(?=.*[@$!%*?&])/,
            "Password must contain one special character at least"
          )
          .max(16, "Password must be less than 16 characters")
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}/,
            "Password isn't vaild"
          ),
      });
      const result = credentialsValidation.safeParse({ username, password });
      if (!result.success) {
        const errors = z.treeifyError(result.error).properties;
        if (errors?.username?.errors) {
          setError(errors.username.errors[0]);
        } else if (errors?.password?.errors) {
          setError(errors.password.errors[0]);
        }
      } else {
        alert("Account created");
      }
    }
  };

  const sendNewCode = () => {
    setCode("");
    setCodeTimer(300);
    setStage("code");
  };

  return (
    <div className="w-80 max-w-[90%] border border-gray-300 p-3 rounded-md">
      <h3 className="text-center mb-0.5">Create Account</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        {stage === "email" ? (
          <EmailStage email={email} setEmail={setEmail} />
        ) : stage === "code" ? (
          <CodeStage
            code={code}
            setCode={setCode}
            codeTimer={codeTimer}
            realTimeFormat={realTimeFormat}
            sendNewCode={sendNewCode}
          />
        ) : stage === "credentials" ? (
          <CredentialsStage
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        ) : null}
        {error && <Tip content={error} type="error" />}
        <Button className="w-full mt-2" style="primary" type="submit">
          Submit
        </Button>
      </form>
      <span className="text-xs block text-center text-gray-600 my-1.5">OR</span>
      <Button className="flex items-center w-full justify-center gap-1">
        <Image
          src={"/icons/google.svg"}
          alt={"Google"}
          width={18}
          height={18}
        />
        Sign Up With Google
      </Button>
      <p className="text-sm mt-2">
        Already have an account ?{" "}
        <Link href={"/auth/signin"} className="underline text-blue-500">
          Sing In
        </Link>
      </p>
    </div>
  );
};

export default SignUpFlow;
