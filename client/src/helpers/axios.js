import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const KEY = "The-store-crud";

export const axiosWithoutToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  return axios({ method, url, data });
};

export const axiosWithToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = JSON.parse(sessionStorage.getItem(KEY)).token || "";
  return axios({
    method,
    url,
    data,
    headers: { "Content-type": "application/json", "x-token": token },
  });
};
