"use server";

export async function register(state: any, forData: FormData) {
  let username = forData.get("username")?.toString();
  let firstname = forData.get("firstname")?.toString();
  let lastname = forData.get("lastname")?.toString();
  let email = forData.get("email")?.toString();
  let file = forData.get("file")?.toString();
  let gender = forData.get("gender")?.toString();
  let password = forData.get("password")?.toString();
  let comfirmPasswod = forData.get("confirmPassword")?.toString();
  if (state.step === 1) {
    if (!username || !firstname || !lastname || !email) {
      return {
        step: 1,
        error: {
          messages: "Please fill all fields",
          value: {
            username: forData.get("username")?.toString(),
            firstname: forData.get("firstname")?.toString(),
            lastname: forData.get("lastname")?.toString(),
            email: forData.get("email")?.toString(),
          },
        },
      };
    }

    return { step: 2 };
  }
}
