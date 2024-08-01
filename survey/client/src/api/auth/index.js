import useGlobalStore from "@/store/GlobalStore";

export const signUp = async ({username, email, password}) => {
    try {
        let response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username, email, password}),
        });
        return await response.json();
      } catch (err) {
        console.log(err);
      }
}

export const signIn = async ({email, password}) => {
    console.log(email,password)
    try {
        let response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email, password}),
        });
        return await response.json();
      } catch (err) {
        console.log(err);
      }
}

export const logout = async () => {
    try {
        let response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": useGlobalStore.getState().token
          },
        });
        return await response.json();
      } catch (err) {
        console.log(err);
      }
}
