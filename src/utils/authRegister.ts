"use server";

export async function register(state: any, forData: FormData) {
  let username = forData.get("username")?.toString();
  let firstname = forData.get("firstname")?.toString();
  let lastname = forData.get("lastname")?.toString();
  let email = forData.get("email")?.toString();
  let file = forData.get("file");
  let gender = forData.get("gender")?.toString();
  let password = forData.get("password")?.toString();
  let comfirmPasswod = forData.get("confirmPassword")?.toString();
  const button = forData.get("button")?.toString();

  if (state.step === 1 && button === "next") {
    if (!username || !firstname || !lastname || !email) {
      return {
        step: 1,
        error: {
          messages: "Please fill all fields",
        },
      };
    } else
      try {
        const url = "http://localhost:3060/api/v1/user/validate";
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            firstname,
            lastname,
            email,
          }),
        });

        if (!response.ok) {
          const result = await response.json();
          console.log(false);
          return {
            step: 1,
            error: {
              messages:
                result.error.details.length !== 0
                  ? result.error.details[0].message
                  : result.error.message
                  ? result.error.message
                  : "Login failed. Please try again.",
            },
          };
        }
        return {
          step: 2,
        };
      } catch (error) {
        return {
          step: 1,
          error: {
            messages: "Please check your connection and try again.",
          },
        };
      }
  }

  if (state.step === 2 && button === "register") {
    if (!file || !gender || !password || !comfirmPasswod) {
      return {
        step: 2,
        error: {
          messages: "Please fill all fields",
        },
      };
    } else if (password !== comfirmPasswod) {
      return {
        step: 2,
        error: {
          messages: "Password does not match",
        },
      };
    } else if (
      username &&
      firstname &&
      lastname &&
      email &&
      file &&
      gender &&
      password &&
      comfirmPasswod
    ) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("image", file);
      formData.append("gender", gender);
      formData.append("password", password);

      try {
        let url = "http://localhost:3060/api/v1/user/validate";

        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gender,
            password,
          }),
        });

        if (!response.ok) {
          const result = await response.json();
          console.log(result.error.path);
          return {
            step: 2,
            error: {
              messages:
                result.error.details.length !== 0
                  ? result.error.details[0].message
                  : result.error.message
                  ? result.error.message
                  : "Login failed. Please try again.",
            },
          };
        }

        console.log(formData);

        url = "http://localhost:3060/api/v1/user/register";
        const newResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!newResponse.ok) {
          const result = await newResponse.json();
          return {
            step: 2,
            error: {
              messages:
                result.error.details.length !== 0
                  ? result.error.details[0].message
                  : result.error.message
                  ? result.error.message
                  : "Login failed. Please try again.",
            },
          };
        }
        return {
          success: true,
        };
      } catch (error) {
        return {
          step: 2,
          error: {
            messages: "Please check your connection and try again.",
          },
        };
      }
    }
  }

  if (state.step === 2 && button === "back") {
    return { step: 1 };
  }
}
