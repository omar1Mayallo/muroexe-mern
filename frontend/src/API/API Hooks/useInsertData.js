import baseUrl from "../api";

const useInsertData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseUrl.post(url, params, config);
  return res;
};

const userInsertDataWithImg = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseUrl.post(url, params, config);
  return res;
};
export {useInsertData, userInsertDataWithImg};
