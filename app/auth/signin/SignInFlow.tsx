"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Tip from "@/components/Tip";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import z from "zod";

const SignInFlow = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const accountValidation = z.object({
      usernameOrEmail: z
        .string()
        .trim()
        .min(1, "Enter your Username or Email")
        .refine(
          (value) => {
            const isEmail = z.string().email().safeParse(value).success;
            const isUsername = /^[A-Za-z][A-Za-z0-9_]{5,29}$/.test(value);
            return isEmail || isUsername;
          },
          {
            error: "Enter a vaild Email or vaild Username",
          }
        ),
      password: z
        .string()
        .min(1, "Enter your password")
        .min(8, "Enter a vaild password"),
    });
    const result = accountValidation.safeParse({ usernameOrEmail, password });
    if (!result.success) {
      const errors = z.treeifyError(result.error).properties;
      if (errors?.usernameOrEmail?.errors) {
        setError(errors.usernameOrEmail.errors[0]);
      } else if (errors?.password?.errors) {
        setError(errors.password.errors[0]);
      }
    }
  };

  return (
    <div className="w-80 max-w-[90%] border border-gray-300 p-3 rounded-md">
      <h3 className="text-center mb-0.5">Welcome Back!</h3>
      <p className="text-sm text-center mb-2 text-gray-600">
        Sign in to your account
      </p>
      <form onSubmit={handleSubmit}>
        <label className="text-sm">Username or email</label>
        <InputField
          type={"text"}
          placeholder="user_123"
          value={usernameOrEmail}
          setValue={setUsernameOrEmail}
        />
        <label className="text-sm">Password</label>
        <InputField
          type={"password"}
          placeholder="Q?94voL!0@m"
          value={password}
          setValue={setPassword}
        />
        <Link href={"#"} className="text-sm mt-2 block underline text-blue-500">
          Forgot your password ?
        </Link>
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
        Sign In With Google
      </Button>
      <p className="text-sm mt-2">
        Don't have an account ?{" "}
        <Link href={"/auth/signup"} className="underline text-blue-500">
          Create One
        </Link>
      </p>
    </div>
  );
};

export default SignInFlow;
