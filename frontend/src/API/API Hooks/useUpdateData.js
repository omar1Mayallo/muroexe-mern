import baseUrl from "../api";

const useInsertUpdateData = async (url, params) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
  };
  const res = await baseUrl.patch(url, params, config);
  return res;
};

const useUpdateDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseUrl.patch(url, params, config);

  return res;
};

export {useInsertUpdateData, useUpdateDataWithImage};
