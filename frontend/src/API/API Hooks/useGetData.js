import baseUrl from "../api";

export const useGetData = async (url, params) => {
  const res = await baseUrl.get(url, params);
  return res.data;
};
