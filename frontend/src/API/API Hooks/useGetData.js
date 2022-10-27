import baseUrl from "../api";

export const useGetData = async (url, params) => {
  const res = await baseUrl.get(url, params);
  return res.data;
};

export const useGetDataLogged = async (url, params) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
  };
  const res = await baseUrl.get(url, config);
  return res.data;
};
