import axios from "axios";

export const SendVerifyMessage = async (phoneNumber) => {
  try {
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Sign/SendVerifyMessage`,
      { phoneNumber }
    );
  } catch (error) {
    return error;
  }
};

export const VerifyMessage = async (data) => {
  try {
    return await axios.post(
      "https://acadapi.etacorealtime.ir/api/Sign/VerifyMessage",
      data
    );
  } catch (error) {
    return error;
  }
};

export const VerifyCofigValue = async (value) => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Sign/Reset/${value}`
    );
  } catch (error) {
    return error;
  }
};
