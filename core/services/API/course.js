import mainContext, { contextValue } from "@/context/mainContext";
import axios from "axios";
import { useContext } from "react";

export const getAllCourses = async (filter, token) => {
  const query =
    typeof filter === "object"
      ? `PageNumber=${filter.page}&RowsOfPage=${filter.pageSize}${
          filter.selectedCategori ? `&ListTech=${filter.selectedCategori}` : ""
        }${filter.courseSearch ? `&Query=${filter.courseSearch}` : ""}${
          filter.selectedTeacher ? `&TeacherId=${filter.selectedTeacher}` : ""
        }${filter.level ? `&courseLevelId=${filter.level}` : ""}${
          filter.selectedType ? `&CourseTypeId=${filter.selectedType}` : ""
        }&CostDown=${filter.priceRange[0]}&CostUp=${
          filter.priceRange[1]
        }&SortingCol=${filter.SortingCol}&SortType=${filter.SortType}`
      : filter;
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/GetCoursesWithPagination?${
        query || ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const getAllTeachers = async () => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/GetTeachers`
    );
  } catch (error) {
    return error;
  }
};

export const likeCourse = async (courseID, token) => {
  try {
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Course/AddCourseLike?CourseId=${courseID}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const DeletelikeCourse = async (courseID, token) => {
  try {
    return await axios.delete(
      `https://acadapi.etacorealtime.ir/api/Course/DeleteCourseLike`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { CourseLikeId: courseID },
      }
    );
  } catch (error) {
    return error;
  }
};

export const addToFavorite = async (courseID, token) => {
  try {
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Course/AddCourseFavorite`,
      { courseId: courseID },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    return error;
  }
};

export const DeleteFavorite = async (courseID, token) => {
  try {
    return await axios.delete(
      `https://acadapi.etacorealtime.ir/api/Course/DeleteCourseFavorite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { CourseFavoriteId: courseID },
      }
    );
  } catch (error) {
    return error;
  }
};

export const getAllCourseType = async () => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/CourseType/GetCourseTypes`
    );
  } catch (error) {
    return error;
  }
};

export const getAllCourseLevels = async () => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/CourseLevel/GetAllCourseLevel`
    );
  } catch (error) {
    return error;
  }
};

export const getCourseDetail = async (courseID, token) => {
  console.log(contextValue);
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/GetCourseDetails?CourseId=${courseID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    return error;
  }
};

export const getAllComments = async (courseID) => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Course/GetCourseCommnets/${courseID}`
    );
  } catch (error) {
    return error;
  }
};

export const AddCommentAPI = async (data, token) => {
  try {
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Course/AddCommentCourse`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    return error;
  }
};
