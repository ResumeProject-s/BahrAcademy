import axios from "axios";

export const Register = async (userData) => {
  try {
    return await axios.post(
      "https://acadapi.etacorealtime.ir/api/Sign/Register",
      userData
    );
  } catch (error) {
    return error;
  }
};

export const loginUser = async (userData) => {
  try {
    const result = await axios.post(
      "https://acadapi.etacorealtime.ir/api/Sign/Login",
      userData
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const resetPasswordStepOne = async (email, baseUrl) => {
  const obj = {
    email,
    baseUrl,
  };
  try {
    const result = await axios.post(
      "https://acadapi.etacorealtime.ir/api/Sign/ForgetPassword",
      obj
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const resetPasswordStepThree = async (value) => {
  try {
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Sign/Reset`,
      value
    );
  } catch (error) {
    return error;
  }
};
