import axios from "axios";
const getApiUrl = () => process.env.REACT_APP_API as string;

export async function fetchData(endpoint: string, token: string) {
  const BASE_URL = getApiUrl();
  return axios
    .get(BASE_URL + endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
}
export default getApiUrl;
