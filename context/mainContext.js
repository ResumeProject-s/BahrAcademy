import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CoursesData, userPanelColorsData, usersData } from "@/DB/DataBase";
import Snack from "@/components/common/Snack";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import ModalBar from "@/components/common/ModalBar";
import { format } from "date-fns";
import axios from "axios";

const mainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [userIsLogin, setUserIsLogin] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [users, setUsers] = useState([]);
  const [cartCourses, setCartCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [waitingPageCourses, setWaitingPageCourses] = useState([]);
  const [showSnack, setShowSnack] = useState({
    title: "",
    status: "",
    time: 0,
  });
  const [showModel, setShowModel] = useState({
    title: "",
    status: "",
    event: "",
  });
  const [themeColor, setThemeColor] = useState([
    "rgb(35, 150, 243)",
    "rgb(213 237 255)",
    "rgb(132, 200, 255)",
  ]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState(() => {
    return useLocalStorage("userData", "", true);
  });
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [token, setToken] = useState("");

  const router = useRouter();

  const toggleThem = () => {
    setTheme((prev) => {
      if (prev === "dark") {
        useLocalStorage("theme", "auto");
        return "auto";
      } else if (prev === "auto") {
        useLocalStorage("theme", "light");
        return "light";
      } else {
        useLocalStorage("theme", "dark");
        return "dark";
      }
    });
  };
  const handleLoginUser = (value) => {
    setUserIsLogin(value);
  };
  const handleCartCourses = (value, addItem = false) => {
    const courseWasInCart = cartCourses.some(
      (course) => course.id === value.id
    );
    if (addItem) {
      if (!courseWasInCart) {
        useLocalStorage("cart", JSON.stringify([...cartCourses, value]));
        const newValue = [...cartCourses, value];
        setCartCourses(newValue);
        useLocalStorage("cart", newValue, true);
        return;
      } else {
        return;
      }
    }
    setCartCourses(value);
    useLocalStorage("cart", value, true);
  };
  const handleRemoveUser = async () => {
    const newUsers = users.filter((user) => user.id !== currentUser.id);
    useLocalStorage("token", null);
    useLocalStorage("currentUser", null);
    setToken(null);
    setUsers(newUsers);
    await router.replace("/");
    await useLocalStorage("userData", null);
    setCurrentUser(null);
    setUserIsLogin(false);
  };
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const handleShowSnack = (title, time, status) => {
    setShowSnack({
      title,
      status,
      time,
    });
    setTimeout(() => {
      setShowSnack({ title: "", status: "", time: 0 });
    }, time);
  };
  const handleShowModal = (title, status, event) => {
    setShowModel({
      title,
      status,
      event,
    });
  };
  const handleCloseModal = () => {
    setShowModel({
      title: "",
      status: "",
      event: "",
    });
  };
  const handleChangePanelTheme = (newTheme) => {
    setThemeColor(newTheme);
    useLocalStorage("userPanelTheme", newTheme, true);
  };
  const handleBuy = (courses = null) => {
    if (!courses) {
      if (cartCourses.length) {
        setUserCourses((prev) => {
          useLocalStorage("userCourses", [...prev, ...cartCourses], true);
          return [...cartCourses, ...prev];
        });

        setCartCourses([]);
        useLocalStorage("cart", [], true);

        handleShowSnack("خرید شما با موفقیت انجام شد", 3000, "seccess");

        setLatestTransactions((prev) => {
          useLocalStorage(
            "latestTransactions",
            [
              {
                id: latestTransactions.length + 1,
                amount: cartCourses.reduce((prev, current) => {
                  return prev + current.nuumberprice;
                }, 0),
                date: format(Date.now(), "yyyy/MM/dd"),
                status: true,
              },
              ...prev,
            ],
            true
          );
          return [
            {
              id: latestTransactions.length + 1,
              amount: cartCourses.reduce((prev, current) => {
                return prev + current.nuumberprice;
              }, 0),
              date: format(Date.now(), "yyyy/MM/dd"),
              status: true,
            },
            ...prev,
          ];
        });
        useLocalStorage("latestTreansactions", latestTransactions, true);
      } else {
        handleShowSnack("محصولی در سبد شما نیست", 3000, "error");
      }
    } else {
      setUserCourses(courses);
    }
  };
  const handleAddToWaitingPage = (CourseID) => {
    const currentCourse = CoursesData.find((course) => course.id === CourseID);
    setWaitingPageCourses((prev) => [...prev, currentCourse]);
    useLocalStorage(
      "waitingPageCourses",
      [...waitingPageCourses, currentCourse],
      true
    );
    handleShowSnack("دوره به صفحه انتظار شما اضافه شد", 2000, "seccess");
  };
  const handleDeleteFromWaitingPage = (CourseID) => {
    const newWaitingCourses = waitingPageCourses.filter(
      (course) => course.id !== CourseID
    );
    setWaitingPageCourses(newWaitingCourses);
    useLocalStorage("waitingPageCourses", newWaitingCourses, true);
  };
  const handleDeleteFromUserCourse = (CourseID) => {
    const newUserCourses = userCourses.filter((course) => {
      console.log(course.id, CourseID);
      return course.id !== CourseID;
    });
    handleBuy(newUserCourses);
    console.log(newUserCourses);
    useLocalStorage("userCourses", newUserCourses, true);
  };
  const handleToggleUser = (userID) => {
    setCurrentUser(users.find((user) => user.id === userID));
  };
  const handleAddToBookList = (CourseID) => {
    const currentCourse = CoursesData.find((course) => course.id === CourseID);
    useLocalStorage("BookList", [...bookList, currentCourse], true);
    setBookList((prev) => [...prev, currentCourse]);
    handleShowSnack("این دوره به قسمت ذخیره شده ها اضافه شد", 3000, "seccess");
  };
  const handleDeleteFromBookList = (CourseID) => {
    useLocalStorage(
      "BookList",
      bookList.filter((course) => course.id !== CourseID),
      true
    );
    setBookList((prev) => prev.filter((course) => course.id !== CourseID));
  };

  useEffect(() => {
    // userData
    if (typeof localStorage !== "undefined") {
      var userData = JSON.parse(useLocalStorage("userData"));
      if (userData) {
        setUserIsLogin(true);
      } else {
        setUserIsLogin(false);
      }
    }
    // userCart
    if (userData) {
      const cartData = useLocalStorage("cart", "", true);
      if (cartData) {
        setCartCourses(cartData);
      } else {
        setCartCourses([]);
      }
    } else {
      setCartCourses([]);
    }
    // theme
    if (theme !== null) {
      setTheme(() => {
        if (useLocalStorage("theme") === "dark") {
          return "dark";
        } else if (useLocalStorage("theme") === "light") {
          return "light";
        } else {
          return "auto";
        }
      });
    }
    // userCourses
    const userCourses = useLocalStorage("userCourses", "", true);
    if (userCourses?.length) {
      setUserCourses(userCourses);
    } else {
      setUserCourses([]);
    }
    // waitingPageCourses
    const waitingPageCourses = useLocalStorage("waitingPageCourses", "", true);
    if (waitingPageCourses?.length) {
      setWaitingPageCourses(waitingPageCourses);
    } else {
      setWaitingPageCourses([]);
    }

    // bookList
    const bookList = useLocalStorage("BookList", "", true);
    if (bookList?.length) {
      setBookList(bookList);
    } else {
      setBookList([]);
    }
    // userpanelTheme
    const currentUserPanelTheme = useLocalStorage("userPanelTheme", "", true);
    if (currentUserPanelTheme) {
      setThemeColor(currentUserPanelTheme);
    } else {
      setThemeColor(userPanelColorsData[0]);
    }
    const latestTransactions = useLocalStorage("latestTransactions", "", true);
    if (latestTransactions) {
      setLatestTransactions(latestTransactions);
    } else {
      setLatestTransactions([]);
    }
    // token
    const token = userIsLogin ? useLocalStorage("token", "", true) : "";
    setToken(token);
  }, []);
  useEffect(() => {
    document.querySelector("html").classList = theme;
  }, [theme]);
  useEffect(() => {
    setWindowWidth(window?.innerWidth);
    window?.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  });
  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
  }, []);

  const contextValue = {
    theme,
    toggleThem,
    scrollToTop,
    userIsLogin,
    handleRemoveUser,
    handleLoginUser,
    handleCartCourses,
    cartCourses,
    handleShowSnack,
    themeColor,
    handleChangePanelTheme,
    windowWidth,
    userCourses,
    handleBuy,
    handleShowModal,
    waitingPageCourses,
    handleAddToWaitingPage,
    handleDeleteFromWaitingPage,
    handleDeleteFromUserCourse,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    handleToggleUser,
    bookList,
    handleAddToBookList,
    handleDeleteFromBookList,
    latestTransactions,
    allCourses,
    setAllCourses,
    token,
  };

  return (
    <mainContext.Provider value={contextValue}>
      <div dir="ltr">
        <LoadingBar
          color="#2396f3"
          shadow={true}
          progress={progress}
          waitingTime={800}
        />
      </div>
      {showSnack.title ? <Snack {...showSnack} /> : null}
      {showModel.title ? (
        <ModalBar {...showModel} handleCloseModal={handleCloseModal} />
      ) : null}
      {children}
    </mainContext.Provider>
  );
};

export { MainContextProvider };
export default mainContext;
