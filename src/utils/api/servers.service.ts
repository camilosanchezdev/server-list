import axios from "axios";
import getApiUrl from "./api.service";
import { useAppSelector } from "./../../state/typedReduxHooks";

export const GetServices = async () => {
  const { auth } = useAppSelector((state: any) => state);
  const token = auth.token;
  const BASE_URL = getApiUrl();
  try {
    const result = await axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
      url: BASE_URL + "servers",
    });

    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};
