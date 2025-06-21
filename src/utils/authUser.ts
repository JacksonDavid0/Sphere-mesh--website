export default async function getAuthUser(id?: any) {
  if (!id) {
    try {
      const url = "http://localhost:3060/api/v1/user/profile";
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          success: true,
          data: result,
        };
      } else {
        const result = await response.json();
        return {
          success: false,
          error: {
            message:
              result.error.details.length !== 0
                ? result.error.details[0].message
                : result.error.message
                ? result.error.message
                : "Failed to fetch user",
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Please check your connection and try again.",
        },
      };
    }
  } else {
    try {
      const url = `http://localhost:3060/api/v1/user/profile/${id}`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          success: true,
          data: result,
        };
      } else {
        const result = await response.json();
        return {
          success: false,
          error: {
            message:
              result.error.details.length !== 0
                ? result.error.details[0].message
                : result.error.message
                ? result.error.message
                : "Failed to fetch user",
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Please check your connection and try again.",
        },
      };
    }
  }
}
