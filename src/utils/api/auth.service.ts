import axios from "axios";
import getApiUrl from "./api.service";

interface ICredentials {
  username: string;
  password: string;
}
export const authenticate = async (data: ICredentials) => {
  const BASE_URL = getApiUrl();
  try {
    const result = await axios({
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
      url: BASE_URL + "tokens",
    });
    localStorage.setItem("token", result.data.token);

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};
