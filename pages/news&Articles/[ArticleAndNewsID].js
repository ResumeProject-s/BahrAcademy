import {
  CoursesData,
  LatestArticlesData,
  LatestNewsData,
  newsAndArticlesData,
} from "@/DB/DataBase";
import Course from "@/components/common/Course";
import Rodemap from "@/components/common/Rodemap";
import Comments from "@/components/common/Comments";
import Layout from "@/layout/Layout";
import AddComment from "@/components/common/AddComment";
import React, { useContext, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Link from "next/link";
import mainContext from "@/context/mainContext";

const ArticleAndNewsID = (props) => {
  const router = useRouter();
  const currentItem = newsAndArticlesData.find(
    (item) => item.id === Number(props.itemID)
  );

  const coursesTitle = CoursesData.map((course) => course.title);
  const allText =
    currentItem.title + currentItem.desceiption + currentItem.text;

  let suggestedCoursesTitles = [];
  let suggestedCourses = [];
  let suggestedCoursesCategori = [];
  let relatedCourses = [];

  coursesTitle.forEach((course) => {
    if (allText.toLowerCase().includes(course.toLowerCase())) {
      suggestedCoursesTitles.push(course);
    }
  });

  suggestedCoursesTitles.map((courseTitle) => {
    const matchedCourses = CoursesData.filter(
      (course) => course.title.toLowerCase() === courseTitle.toLowerCase()
    );
    suggestedCourses.push(...matchedCourses);
  });

  suggestedCourses.map((course) =>
    suggestedCoursesCategori.push(course.categori)
  );

  suggestedCoursesCategori.map((categori) => {
    let courses = CoursesData.filter((course) => course.categori === categori);
    relatedCourses.push(...courses);
  });

  const contextData = useContext(mainContext);

  const nextEnable =
    Math.max(...newsAndArticlesData.map((item) => item.id)) === currentItem.id;
  const prevEnable =
    Math.min(...newsAndArticlesData.map((item) => item.id)) === currentItem.id;

  const [comments, setComments] = useState(currentItem.comments);

  const handleSubmit = (value, event, parentID = null) => {
    if (contextData.userIsLogin) {
      const currentDate = new Date();
      const forrmatDate = format(currentDate, "yyyy-MM-dd");
      const newObject = {
        id: comments.length + 1,
        fullName: value.fullName,
        title: value.text,
        image: "/images/icons/profile.jpg",
        date: forrmatDate,
        parentID,
      };
      setComments((prev) => [newObject, ...prev]);
      event.resetForm();
    } else {
      router.replace("/Authentication/login");
    }
  };

  const handleGetReplays = (commentID) => {
    return comments.filter((comment) => comment.parentID === commentID);
  };
  return (
    <Layout>
      <div>
        <Rodemap title={currentItem.title} />
        <div className="grid xl:grid-cols-4 grid-cols-3 gap-7">
          <div
            className={`${
              suggestedCourses.length ? "col-span-3" : "col-span-4"
            }`}
          >
            <div className="flex justify-start gap-4">
              <button className="rounded-full bg-[#2396f3] text-white py-2 px-4">
                {currentItem.categori}
              </button>
            </div>
            <h1
              className={`text-4xl mt-7 dark:text-white ${
                suggestedCourses.length ? "text-right" : "text-center"
              }`}
            >
              {currentItem.title}
            </h1>
            <p
              className={`text-gray-700 md:text-xl text-base mt-7 dark:text-gray-300 ${
                suggestedCourses.length ? "text-right" : "text-center"
              }`}
            >
              {currentItem.desceiption}
            </p>
            <div
              className={`flex ${
                suggestedCourses.length ? "justify-start" : "justify-center"
              } sm:gap-10 gap-5 items-center mt-5`}
            >
              <div className="flex justify-center gap-3 items-center text-gray-500 dark:text-gray-300">
                <CiCalendarDate size="20px" />
                <span className="md:text-base sm:text-sm text-xs">
                  {currentItem.date} تاریخ
                </span>
              </div>
              <div className="flex justify-center gap-3 items-center text-gray-500 dark:text-gray-300">
                <img
                  src="/images/icons/profile.jpg"
                  alt="profile"
                  className="rounded-full w-7"
                />
                <span className="md:text-base sm:text-sm text-xs">
                  {currentItem.author}
                </span>
              </div>
            </div>
            <div
              className={`w-full flex ${
                suggestedCourses.length ? "justify-start" : "justify-center"
              }`}
            >
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="rounded-lg mt-5 h-[350px]"
              />
            </div>
            <div className="mt-10">
              <p className="text-gray-500 dark:text-gray-300 leading-10">
                {currentItem.text}
              </p>
            </div>
          </div>
          {suggestedCourses.length ? (
            <aside
              dir="ltr"
              className="bg-white dark:bg-black col-span-1 w-full rounded-lg p-3 shadow-md sticky h-[86vh] overflow-y-auto top-24 xl:block hidden"
            >
              <div dir="rtl">
                <h3 className="text-2xl mb-4">دوره های مرتبط</h3>
                <div className="grid grid-cols-1 gap-5">
                  {relatedCourses.map((course) => (
                    <Course {...course} key={course.id} view="col" />
                  ))}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
        <div className="w-full flex justify-center mt-24">
          <main className="w-fit flex md:gap-36 sm:gap-24 gap-11">
            <button
              className={`bg-green-500 sm:w-24 w-16 sm:h-8 h-6 rounded-md text-white relative ${
                nextEnable ? "opacity-70" : null
              }`}
            >
              بعدی
              {!nextEnable ? (
                <Link
                  className="w-full h-full block absolute top-0 right-0 leading-8"
                  href={`/news&Articles/${currentItem.id + 1}`}
                ></Link>
              ) : null}
            </button>
            <span className="lg:text-base sm:text-sm text-xs">
              {currentItem.title}
            </span>
            <button
              className={`bg-[#2396f3] sm:w-24 w-16 sm:h-8 h-6 rounded-md text-white relative ${
                prevEnable ? "opacity-70" : null
              }`}
            >
              قبلی
              {!prevEnable ? (
                <Link
                  className="w-full h-full block absolute top-0 right-0 leading-8"
                  href={`/news&Articles/${currentItem.id - 1}`}
                ></Link>
              ) : null}
            </button>
          </main>
        </div>
        <section className="mt-16 " id="comments">
          <header className="flex gap-3">
            <h1 className="text-black dark:text-white md:text-3xl sm:text-2xl text-xl font-bold mb-10">
              نظرات
            </h1>
            <span>{`(${comments.length})`}</span>
          </header>
          <ul>
            {comments
              .filter((comment) => comment.parentID === null)
              .map((comment) => (
                <Comments
                  key={comment.id}
                  {...comment}
                  handleSubmit={handleSubmit}
                  handleGetReplays={handleGetReplays}
                />
              ))}
          </ul>
          <h2 className="md:text-3xl sm:text-2xl text-xl text-gray-600 dark:text-gray-200 mt-10">
            ثبت نظر
          </h2>
          <AddComment handleSubmit={handleSubmit} parentID={null} />
        </section>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const itemID = context.params.ArticleAndNewsID;

  return {
    props: {
      itemID: itemID,
    },
  };
}

export default ArticleAndNewsID;
