"use client";

import Input from "@/components/input";
import { login } from "@/utils/authLogin";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [state, action, ispending] = useActionState(login, undefined);

  const handleChange = () => {
    setMessage("");
    if (state) {
      state.error = undefined;
    }
  };

  useEffect(() => {
    if (searchParams.get("message") && message === null) {
      setMessage(searchParams.get("message"));
    }

    if (state?.success === true) {
      router.push("/");
    }
  }, [state?.success, router, searchParams]);
  return (
    <div className="login">
      <div className="login-form-container">
        <h1 className="title">Login</h1>
        <form className="login-form" action={action}>
          <Input
            label="Email"
            type="email"
            placeholder="Email..."
            name="email"
            onClick={handleChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password..."
            name="password"
            onClick={handleChange}
          />
          <Link href={"/forget-password"} className="forgotten-link">
            Forgotten Password
          </Link>
          {state?.error?.message ? (
            <p className="error">{state.error.message}</p>
          ) : message ? (
            <p className="error">{message}</p>
          ) : (
            ""
          )}
          <button className="submit-btn" disabled={ispending}>
            {ispending ? <span className="loading"></span> : "Submit"}
          </button>
          <Link href={"/register"} className="register-link">
            Create an Account
          </Link>
        </form>
      </div>
    </div>
  );
}
