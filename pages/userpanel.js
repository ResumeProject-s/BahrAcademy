import React, { useContext, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingCart, FiUserPlus } from "react-icons/fi";
import {
  MdBookmarks,
  MdOutlineBookmarks,
  MdPlaylistAdd,
  MdPlaylistAddCheck,
} from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { AiOutlineClockCircle, AiOutlineLogout } from "react-icons/ai";
import Profile from "@/components/userPanel/Profile/Profile";
import CoursesList from "@/components/userPanel/CoursesList";
import MyList from "@/components/userPanel/MyList";
import WatingPage from "@/components/userPanel/WatingPage";
import Dashbord from "@/components/userPanel/Dashbord";
import UserPanelLayout from "@/components/userPanel/UserPanelLayout";
import ShoppingCart from "@/components/userPanel/ShoppingCart";
import { Router, useRouter } from "next/router";
import mainContext from "@/context/mainContext";
import BookMarks from "@/components/userPanel/BookMarks";
import {
  getAllCourseLevels,
  getAllCourseType,
  getAllCourses,
  getAllTeachers,
} from "@/core/services/API/course";
import { getAllCategories } from "@/core/services/API/Home";

const userpanel = (props) => {
  const handleItemChange = (currentItem) => {
    setSelectedItem(currentItem.textContent);
    setCurrentComponent(
      items.find((item) => item.title === currentItem.textContent)
        .relatedComponent
    );
  };
  const [selectedItem, setSelectedItem] = useState("داشبورد");
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [responsiveSideBarOpen, setResponsiveSideBarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(
    <Dashbord handleItemChange={handleItemChange} />
  );
  const router = useRouter();
  const contextData = useContext(mainContext);

  const items = [
    {
      id: 1,
      title: "داشبورد",
      icon: <LuLayoutDashboard size={sideBarOpen ? "20px" : "30px"} />,
      relatedComponent: <Dashbord handleItemChange={handleItemChange} />,
    },
    {
      id: 2,
      title: "ویرایش پروفایل",
      icon: <ImProfile size={sideBarOpen ? "20px" : "30px"} />,
      relatedComponent: <Profile handleItemChange={handleItemChange} />,
    },
    {
      id: 3,
      title: "لیست دوره ها",
      icon: <MdPlaylistAdd size={sideBarOpen ? "20px" : "30px"} />,
      relatedComponent: <CoursesList {...props} />,
    },
    {
      id: 4,
      title: "دوره های من",
      icon: <MdPlaylistAddCheck size={sideBarOpen ? "20px" : "30px"} />,
      relatedComponent: <MyList />,
    },
    {
      id: 6,
      title: "سبد خرید",
      icon: <FiShoppingCart size={sideBarOpen ? "20px" : "30px"} />,
      relatedComponent: <ShoppingCart />,
    },
    {
      id: 7,
      title: "افزودن حساب",
      icon: <FiUserPlus size={sideBarOpen ? "20px" : "30px"} />,
      relatedComponent: <ShoppingCart />,
      color: "00d76a",
      shadow: "00ff00",
      event: () => router.replace("/Authentication/signup"),
    },
    {
      id: 8,
      title: "خروج از حساب",
      icon: <AiOutlineLogout size={sideBarOpen ? "20px" : "30px"} />,
      color: "FF5B5B",
      shadow: "ff9090",
      event: () => contextData.handleRemoveUser(),
    },
  ];

  const handleToggleSideBar = () => {
    setSideBarOpen((prev) => !prev);
  };

  const handleToggleResponsiveSideBar = (value) => {
    setResponsiveSideBarOpen(value);
  };

  return (
    <UserPanelLayout
      selectedItem={selectedItem}
      handleItemChange={handleItemChange}
      items={items}
      sideBarOpen={sideBarOpen}
      handleToggleSideBar={handleToggleSideBar}
      responsiveSideBarOpen={responsiveSideBarOpen}
      handleToggleResponsiveSideBar={handleToggleResponsiveSideBar}
    >
      {currentComponent}
    </UserPanelLayout>
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

export default userpanel;
