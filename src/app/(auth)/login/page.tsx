"use client";

import Input from "@/components/input";
import { login } from "@/utils/authLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [state, action, ispending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.push("/");
    }
  }, [state?.success, router]);
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
            value={state?.error?.value ? state?.error?.value : ""}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password..."
            name="password"
            value={"password"}
          />
          <Link href={"/forget-password"} className="forgotten-link">
            Forgotten Password
          </Link>
          {state?.error?.message ? (
            <p className="error">{state.error.message}</p>
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
