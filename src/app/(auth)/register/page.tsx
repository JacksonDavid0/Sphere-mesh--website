"use client";

import Input from "@/components/input";
import { register } from "@/utils/authRegister";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useActionState, useEffect } from "react";

export default function Register() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(register, {
    step: 1,
    error: undefined,
  });

  return (
    <div className="register">
      <div className="register-form-container">
        <h1 className="title">
          {state?.step === 1 || state?.step === 2
            ? "Register"
            : "Account Verification"}
        </h1>
        <form className="register-form" action={action}>
          <div className="step-bar"></div>
          <div
            className="first-step"
            style={{ display: `${state?.step === 1 ? "block" : "none"}` }}
          >
            <Input
              label="Username"
              type="text"
              placeholder="Username..."
              name="username"
            />
            <Input
              label="First Name"
              type="text"
              placeholder="First Name..."
              name="firstname"
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Last Name..."
              name="lastname"
            />
            <Input
              label="Email"
              type="email"
              placeholder="Email..."
              name="email"
            />
          </div>

          <div
            className="second-step"
            style={{ display: `${state?.step === 2 ? "block" : "none"}` }}
          >
            <button className="back-btn" name="button" value={"back"}>
              <IoArrowBackOutline />
            </button>

            <Input label="Image" type="file" placeholder="file" name="file" />

            <Input
              label="Gender"
              type="select"
              placeholder="Gender..."
              name="gender"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password..."
              name="password"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password..."
              name="confirmPassword"
            />
          </div>

          {state?.error ? <p className="error">{state.error.messages}</p> : ""}

          <div
            className="activation-link"
            style={{ display: `${state?.step === 3 ? "block" : "none"}` }}
          >
            Your account has been Registered successfully
            <p>
              {state?.success?.messages
                ? state.success.messages
                : "A verification have been sent to your email. Please activate/verify your account before login."}
            </p>
          </div>

          {state?.step === 1 || state?.step === 2 ? (
            <div className="link">
              <Link href={"/login"} className="login-link">
                Already have an account
              </Link>

              <button
                className="submit-btn"
                name="button"
                disabled={isPending ? true : false}
                value={state?.step === 1 ? "next" : "register"}
              >
                {isPending ? (
                  <span className="loading"></span>
                ) : state?.step === 1 ? (
                  "Next"
                ) : (
                  "Register"
                )}
              </button>
            </div>
          ) : (
            <button
              className="submit-btn"
              onClick={() => router.push("/login")}
              disabled={isPending ? true : false}
            >
              {isPending ? <span className="loading"></span> : <>Go to Login</>}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
