import { CoursesPageFilters } from "@/DB/DataBase";
import Layout from "@/layout/Layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import CourseIndexFilter from "@/components/IndexPage/IndexCourse/CourseIndexFilter";
import Course from "@/components/common/Course";
import { RiFilter2Fill } from "react-icons/ri";
import * as _ from "lodash";
import { Stack } from "@mui/system";
import {
  Box,
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import FilterBar from "@/components/common/FilterBar";
import mainContext from "@/context/mainContext";
import { CiViewColumn, CiViewList } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { HiClock } from "react-icons/hi";
import {
  getAllCourseLevels,
  getAllCourseType,
  getAllCourses,
  getAllTeachers,
} from "@/core/services/API/course";
import Image from "next/image";
import { CoursesContextProvider } from "@/context/coursesContext";
import { getAllCategories } from "@/core/services/API/Home";
import useLocalStorage from "@/hooks/useLocalStorage";

const Courses = (props) => {
  const contextData = useContext(mainContext);
  const itemsPerPage = useRef();

  const [CoursesData, setCoursesData] = useState([]);
  const maxPriceRange = Math.max(
    ...props.allCourses.map((course) => course.cost)
  );
  const minPriceRange = Math.min(
    ...props.allCourses.map((course) => course.cost)
  );
  const [filterSelected, setFilterSelected] = useState(1);
  const [courseSearch, setCourseSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const select = useRef(null);
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [selectedCategori, setSelectedCategori] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [priceRange, setPriceRange] = useState([
    minPriceRange,
    maxPriceRange >= 2000000000 ? 2000000000 : maxPriceRange,
  ]);
  const [selectedView, setSelectedView] = useState("col");

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleSearch = _.debounce((event) => {
    setCourseSearch(event.target.value);
  }, 1500);
  const handlePageChange = (event, page) => {
    setPage(page);
    contextData.scrollToTop();
  };
  const handleChangeCategori = (value) => {
    setSelectedCategori(value);
  };
  const handleSelectedTeacher = (value) => {
    const teacherInfo = props.teachers.find(
      (teacher) => teacher.fullName === value
    );
    setSelectedTeacher(value);
  };
  const handleResetFilters = () => {
    setFilterSelected(2);
    setCoursesData(CoursesData);
    setCourseSearch("");
    setPage(1);
    setIsFilterBarOpen(false);
    setSelectedCategori(null);
    setSelectedTeacher(null);
    setSelectedLevel(null);
    setSelectedType(null);
    setPriceRange([
      props.allCourses.reduce((prev, current) => {
        if (current.cost < prev) {
          return current.cost;
        }
        return prev;
      }, props.allCourses[0] && props.allCourses[0].cost),
      props.allCourses.reduce((prev, current) => {
        if (current.cost > prev) {
          return current.cost;
        }
        return prev;
      }, props.allCourses[0] && props.allCourses[0].cost),
    ]);
  };
  const handleDeleteCoursesData = (CourseID) => {
    const newCourses = [...CoursesData].filter(
      (course) => course.id !== CourseID
    );
    setCoursesData(newCourses);
    setCoursesData(newCourses);
  };

  useEffect(() => {
    const getDataCourses = async () => {
      const filter = {
        page,
        pageSize,
        selectedCategori,
        courseSearch,
        selectedTeacher,
        level: selectedLevel,
        selectedType,
        priceRange,
        SortingCol:
          filterSelected === 1
            ? "likeCount"
            : filterSelected === 2
            ? "currentRegistrants"
            : filterSelected === 3
            ? "cost"
            : filterSelected === 4
            ? "cost"
            : "lastUpdate",
        SortType:
          filterSelected === 3
            ? "Asc"
            : filterSelected === 4
            ? "DESC"
            : filterSelected === 5
            ? "DESC"
            : "Asc",
      };
      const result = await getAllCourses(
        filter,
        await useLocalStorage("token", "", true)
      ).then((data) => data?.data?.courseFilterDtos || []);
      setCoursesData(result);
    };
    getDataCourses();
  }, [
    page,
    pageSize,
    selectedCategori,
    courseSearch,
    selectedTeacher,
    selectedLevel,
    selectedType,
    priceRange,
    filterSelected,
  ]);

  return (
    <>
      <CoursesContextProvider
        CurrentValue={{
          allCategories: props.allCategories,
          teachers: props.teachers,
          allCourses: props.allCourses,
          priceRange,
          minPriceRange,
          maxPriceRange,
          selectedCategori,
          selectedTeacher,
          selectedLevel,
          CoursesData,
          selectedType,
          allLevels: props.allLevels,
          allTypes: props.allTypes,
          setSelectedCategori,
          setSelectedTeacher,
          setPriceRange,
          setSelectedLevel,
          setSelectedType,
        }}
      >
        <Layout hidden={props.userpanel ? true : false}>
          <div className="md:p-0 p-5">
            <div className={"grid grid-cols-4 gap-7"}>
              <div className="lg:block hidden">
                <FilterBar
                  userpanel
                  filterSelected={filterSelected}
                  selectedCategori={selectedCategori}
                  selectedLevel={selectedLevel}
                  selectedTeacher={selectedTeacher}
                  priceRange={priceRange}
                  selectedType={selectedType}
                  handleChangeCategori={handleChangeCategori}
                  handlePriceChange={handlePriceChange}
                  handleSelectedTeacher={handleSelectedTeacher}
                  maxPriceRange={maxPriceRange}
                  minPriceRange={minPriceRange}
                  handleResetFilters={handleResetFilters}
                  CoursesData={props.allCourses}
                />
              </div>
              <div className={"lg:col-span-3 col-span-4"}>
                <form className="h-fit relative mb-3 rounded-lg overflow-hidden">
                  <input
                    onChange={(event) => handleSearch(event)}
                    placeholder="جستجو..."
                    className="pr-10 dark:text-white text-black bg-white shadow-sm dark:bg-black outline-none w-full font-iran rounded-lg h-[47px]"
                  />
                  <IoSearchOutline
                    className="absolute top-3 right-2"
                    size={"25px"}
                    color="#64748b"
                  />
                  <button
                    type="button"
                    className="h-full px-3 py-2 absolute left-0 top-0 text-white bg-[#2396f3] text-sm flex justify-center items-center gap-1 lg:hidden"
                    onClick={() => setIsFilterBarOpen((prev) => !prev)}
                  >
                    <RiFilter2Fill />
                    فیلتر
                  </button>
                </form>
                <div className="flex justify-between xl:items-start items-center gap-5">
                  <select
                    name="itemsPerPage"
                    ref={itemsPerPage}
                    className="bg-[#2196f3] text-white p-1 block rounded-md sm:h-14 h-10 md:w-auto w-10 text-xs sm:text-sm md:text-base px-3"
                    onChange={() => {
                      setPageSize(itemsPerPage.current.value);
                      setPage(1);
                    }}
                  >
                    <option value="3">3</option>
                    <option value="6" selected>
                      6
                    </option>
                    <option value="12">12</option>
                  </select>
                  <div
                    className={`bg-[#e5e5e5] dark:bg-black w-full 2xl:px-2 px-1 py-2 rounded-md ${
                      !props.userpanel ? "xl:flex hidden" : "hidden"
                    } justify-center 2xl:gap-5 gap-2 mb-4`}
                  >
                    {CoursesPageFilters.map((filter) => (
                      <CourseIndexFilter
                        key={filter.id}
                        coursesPage
                        {...filter}
                        setFilterSelected={setFilterSelected}
                        filterSelected={filterSelected}
                      />
                    ))}
                  </div>
                  {!props.userpanel ? (
                    <div className="justify-center items-center p-2 gap-3 bg-[#2396f3] sm:h-14 h-10 rounded-lg text-white hidden sm:flex">
                      <button
                        className={`"h-full w-full p-2 rounded-md ${
                          selectedView === "col" && "bg-blue-300"
                        }`}
                        onClick={() => setSelectedView("col")}
                      >
                        <CiViewColumn
                          size={`${
                            contextData.windowWidth >= 768 ? "25" : "20"
                          }`}
                        />
                      </button>
                      <button
                        className={`"h-full w-full p-2 rounded-md ${
                          selectedView === "row" && "bg-blue-300"
                        }`}
                        onClick={() => setSelectedView("row")}
                      >
                        <CiViewList
                          size={`${
                            contextData.windowWidth >= 768 ? "25" : "20"
                          }`}
                        />
                      </button>
                    </div>
                  ) : null}
                  <select
                    onChange={() => {
                      setFilterSelected(Number(select.current.value));
                    }}
                    ref={select}
                    name="filter"
                    className={`bg-[#2196f3] text-white p-1 ${
                      props.userpanel ? "block" : "xl:hidden block"
                    } rounded-md sm:h-[60px] h-[40px] md:w-auto sm:w-28 w-24 text-xs sm:text-sm md:text-base`}
                  >
                    {CoursesPageFilters.map((item, index) => (
                      <option key={item.id} value={item.id} selected={!index}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={isFilterBarOpen ? "block" : "hidden"}>
                  <FilterBar
                    userpanel
                    filterSelected={filterSelected}
                    courseSearch={courseSearch}
                    selectedCategori={selectedCategori}
                    selectedLevel={selectedLevel}
                    selectedTeacher={selectedTeacher}
                    priceRange={priceRange}
                    selectedType={selectedType}
                    handleChangeCategori={handleChangeCategori}
                    handlePriceChange={handlePriceChange}
                    handleSelectedTeacher={handleSelectedTeacher}
                    maxPriceRange={maxPriceRange}
                    minPriceRange={minPriceRange}
                    handleResetFilters={handleResetFilters}
                    CoursesData={props.allCourses}
                  />
                </div>
                {!props.userpanel ? (
                  <div
                    className={`grid ${
                      selectedView === "col"
                        ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                        : "grid-cols-1"
                    } gap-5 mt-5`}
                  >
                    {CoursesData.length ? (
                      CoursesData.map((course) => (
                        <Course
                          {...course}
                          key={course.id}
                          view={selectedView}
                          handleDeleteCoursesData={handleDeleteCoursesData}
                        />
                      ))
                    ) : (
                      <div className="w-full flex justify-center xl:col-span-4 md:col-span-2">
                        <img
                          src="/images/empty.jpg"
                          alt="noting found"
                          className="lg:w-[40%]"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-zinc-50 dark:bg-gradient-to-t dark:from-[#0a7c4c] dark:to-[#333] shadow-md text-black mt-20 py-3 pb-7 pl-7 border-zinc-200 dark:border-white dark:shadow-sm dark:shadow-white border dark:border-none dark:border-t rounded-lg">
                    <h1 className="text-center mr-3 dark:text-white sm:text-xl text-lg">
                      تمامی دوره ها
                    </h1>
                    <table className="w-full border-spacing-4 rounded-md mt-5">
                      <thead>
                        <tr>
                          <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                            تصویر
                          </th>
                          <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                            نام دوره
                          </th>
                          <th className="text-sm font-normal text-gray-700 dark:text-gray-200 sm:table-cell hidden">
                            تاریخ شروع
                          </th>
                          <th className="text-sm font-normal text-gray-700 dark:text-gray-200 sm:table-cell hidden">
                            مدرس
                          </th>
                          <th className="text-sm font-normal text-gray-700 dark:text-gray-200 md:table-cell hidden">
                            قیمت
                          </th>
                          <th className="text-sm font-normal text-gray-700 dark:text-gray-200 md:table-cell hidden">
                            خرید
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {CoursesData.map((course) => {
                          return (
                            <tr key={course.id} className="">
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 flex justify-center">
                                <img
                                  src={
                                    course.tumbImageAddress ||
                                    "/images/noCourseimg.jpg"
                                  }
                                  alt={course.title}
                                  className=" w-[80px] rounded-sm"
                                />
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300">
                                <span>{course.title}</span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 sm:table-cell hidden">
                                <span className={`px-2 rounded-md`}>
                                  {course.lastUpdate.slice(0, 10)}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300  sm:table-cell hidden">
                                <span className={`px-2 rounded-md`}>
                                  {course.teacherName}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 md:table-cell hidden">
                                <span className={`px-2 rounded-md`}>
                                  {course.cost === 0 ? "رایگان" : course.cost}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 md:table-cell hidden">
                                <div className="flex justify-center cursor-pointer">
                                  {contextData.userCourses.some(
                                    (Course) =>
                                      Course.courseId === course.courseId
                                  ) ||
                                  contextData.cartCourses.some((Course) => {
                                    return Course.courseId === course.courseId;
                                  }) ? (
                                    <IoIosAddCircle
                                      size={25}
                                      className="text-gray-500"
                                    />
                                  ) : (
                                    <IoIosAddCircle
                                      size={25}
                                      className="text-green-500"
                                      onClick={() => {
                                        contextData.handleCartCourses(
                                          course,
                                          true
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="w-full flex justify-center mt-10" dir="ltr">
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(props.allCourses.length / pageSize)}
                      onChange={handlePageChange}
                      shape="rounded"
                      color={"primary"}
                      renderItem={(item) => (
                        <PaginationItem {...item} className="dark:text-white" />
                      )}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </CoursesContextProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const paramstart = context.req.url.indexOf("?");
  const querys =
    paramstart > 0
      ? context.req.url.slice(paramstart, context.req.url.length)
      : "";

  const getMaxCourses = async () => {
    return await getAllCourses();
  };
  const getTeachers = async () => {
    return await getAllTeachers();
  };
  const getCategories = async () => {
    return await getAllCategories();
  };
  const getCourseType = async () => {
    return await getAllCourseType();
  };
  const getCourseLevels = async () => {
    return await getAllCourseLevels();
  };
  return {
    props: {
      searchParam: context.query.categori || null,
      allCourses: await getMaxCourses().then((data) => {
        return data.data.courseFilterDtos;
      }),
      teachers: await getTeachers().then((data) => data.data),
      allCategories: await getCategories().then((data) => data.data),
      allLevels: await getCourseLevels().then((data) => data.data),
      allTypes: await getCourseType().then((data) => data.data),
    },
  };
}

export default Courses;
