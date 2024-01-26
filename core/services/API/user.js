import axios from "axios";

export const getUserInfo = async (token) => {
  try {
    const result = await axios.get(
      "https://acadapi.etacorealtime.ir/api/SharePanel/GetProfileInfo",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result;
  } catch (error) {
    return error;
  }
};
