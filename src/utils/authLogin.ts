"use client";

export async function login(state: any, forData: FormData) {
  const email = forData.get("email");
  const password = forData.get("password");
  if (!email || !password) {
    return {
      error: {
        message: "Please fill all fields",
        value: forData.get("email"),
      },
    };
  }

  const data = {
    email,
    password,
  };

  try {
    const url = "http://localhost:3060/api/v1/user/login";
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(result);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: {
          message:
            result.error.details.length !== 0
              ? result.error.details[0].message
              : result.error.message
              ? result.error.message
              : "Login failed. Please try again.",
          value: forData.get("email"),
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: "Please check your connection and try again.",
        value: forData.get("email"),
      },
    };
  }
}
