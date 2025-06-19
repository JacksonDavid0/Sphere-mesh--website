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

  useEffect(() => {
    if (state?.success === true) {
      router.push("/");
    }
  }, [state?.success, router]);

  return (
    <div className="register">
      <div className="register-form-container">
        <h1 className="title">Register</h1>
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
            {state?.step === 2 ? (
              <button className="back-btn" name="button" value={"back"}>
                <IoArrowBackOutline />
              </button>
            ) : (
              ""
            )}
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
        </form>
      </div>
    </div>
  );
}
