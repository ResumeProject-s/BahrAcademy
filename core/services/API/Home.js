import axios from "axios";

export const getAllCategories = async () => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/GetTechnologies`
    );
  } catch (error) {
    return error;
  }
};

export const getAllReports = async () => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/LandingReport`
    );
  } catch (error) {
    return error;
  }
};

export const getAllNews = async () => {
  try {
    return await axios.get(`https://acadapi.etacorealtime.ir/api/News`);
  } catch (error) {
    return error;
  }
};
