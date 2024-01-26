import { CoursesPageFilters } from "@/DB/DataBase";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Course from "@/components/common/Course";
import { RiFilter2Fill } from "react-icons/ri";
import * as _ from "lodash";
import { Stack } from "@mui/system";
import { Pagination, PaginationItem } from "@mui/material";
import mainContext from "@/context/mainContext";
import { CiViewColumn, CiViewList } from "react-icons/ci";

const MyList = (props) => {
  const contextData = useContext(mainContext);
  const itemsPerPage = useRef();

  const [mainCourses, setMainCourses] = useState(contextData.userCourses);
  const [courseSearch, setCourseSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const select = useRef(null);
  const [selectedView, setSelectedView] = useState("col");

  const handleSearch = (event) => {
    setCourseSearch(event.target.value);
  };
  const handlePageChange = (event, page) => {
    setPage(page);
    contextData.scrollToTop();
  };

  useEffect(() => {
    let updatedData = contextData.userCourses;
    if (courseSearch) {
      updatedData = mainCourses?.filter((course) =>
        _.includes(course.title.toLowerCase(), courseSearch.toLowerCase())
      );
    }
    setMainCourses(updatedData);
  }, [courseSearch]);

  useEffect(() => {
    setMainCourses(contextData.userCourses);
  }, [contextData.userCourses]);

  return (
    <>
      <div className="md:p-0 sm:p-5">
        <h1 className="dark:text-white text-[#4c5c84] lg:text-[25px] text-2xl font-bold text-center">
          دوره های خریداری شده
        </h1>
        <div className={"flex gap-7 justify-center mt-7 sm:px-10"}>
          <div className={"w-full"}>
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
              <div className="justify-center items-center p-2 gap-3 bg-[#2396f3] sm:h-14 h-10 rounded-lg text-white hidden sm:flex">
                <button
                  className={`"h-full w-full p-2 rounded-md ${
                    selectedView === "col" && "bg-blue-300"
                  }`}
                  onClick={() => setSelectedView("col")}
                >
                  <CiViewColumn
                    size={`${contextData.windowWidth >= 768 ? "25" : "20"}`}
                  />
                </button>
                <button
                  className={`"h-full w-full p-2 rounded-md ${
                    selectedView === "row" && "bg-blue-300"
                  }`}
                  onClick={() => setSelectedView("row")}
                >
                  <CiViewList
                    size={`${contextData.windowWidth >= 768 ? "25" : "20"}`}
                  />
                </button>
              </div>
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
            <div
              className={`grid ${
                selectedView === "col"
                  ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                  : "grid-cols-1"
              } gap-5 mt-5`}
            >
              {mainCourses?.length ? (
                mainCourses
                  .slice(page * pageSize - pageSize, page * pageSize)
                  .map((course) => (
                    <Course
                      {...course}
                      key={course.id}
                      view={selectedView}
                      handleDeleteCourse={
                        contextData.handleDeleteFromUserCourse
                      }
                      myList
                    />
                  ))
              ) : (
                <div className="w-full flex justify-center xl:col-span-4 md:col-span-2">
                  <img
                    src="/images/empty.jpg"
                    alt="noting found"
                    className="lg:w-[40%] rounded-lg"
                  />
                </div>
              )}
            </div>
            <div className="w-full flex justify-center mt-10" dir="ltr">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(mainCourses?.length / pageSize)}
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
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      searchParam: context.query.categori || null,
    },
  };
}

export default MyList;
