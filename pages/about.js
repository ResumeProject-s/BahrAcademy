import Layout from "@/layout/Layout";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiSupport, BiGitBranch } from "react-icons/bi";
import { SiCashapp } from "react-icons/si";
import { GoGoal } from "react-icons/go";
import { TbCloudDataConnection } from "react-icons/tb";
import { FaChalkboardTeacher, FaDiagramProject } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import WhyUs from "@/components/about/WhyUs";
import Aos from "aos";

const about = () => {
  const whyUsItems = [
    {
      id: 1,
      title: "پشتیبانی قوی",
      description:
        "اموزشگاه بحر سعی دارد برای ارائه بهترین نوع خدمات غیر حضوری دانشجویان را به بهترین شکل به طور مداوم پشتیبانی کند",
      icon: <BiSupport size={50} />,
      color: "#ef4141",
    },
    {
      id: 2,
      title: "دوره های پولی و رایگان",
      description:
        "برای ما پولی و رایگان فرقی نداره هدف ما بحبود شما از نظر علمی است",
      icon: <SiCashapp size={50} />,
      color: "#0ac945",
    },
    {
      id: 3,
      title: "اجازه تدریس",
      description:
        "ما به هر کسی اجازه تدریس نمیدیم اساتید سایت ما انواع تست های فن بیان و تدریس اصولی رو قبل از استخدام میگذرونند",
      icon: <FaChalkboardTeacher size={50} />,
      color: "#bb4dff",
    },
    {
      id: 4,
      title: "اولویت های ما",
      description:
        "هدف ما از راه اندازی این سایت دسترسی اسان تر شاید نه چندان زیاد برای علاقه مندان به حوزه برنامه نویسی بود و در اولویت های ما رضایت کاربر در صدر قرار داره",
      icon: <GoGoal size={50} />,
      color: "#2396f3",
    },
    {
      id: 5,
      title: "شبکه سازی وسیع",
      description:
        "در سایت ما اساتید های با تجره کاری بالا به شما تدریس می دهند و ما سعی داریم مسابقاتی را در هر ماه برای شما برکذار کنیم برای شناسایی بهتر شما",
      icon: <BiGitBranch size={50} />,
      color: "#9700bd",
    },
    {
      id: 6,
      title: "دوره های پروژه محور",
      description:
        "یکی از الزامات ما برای ثبت دوره اموزشی در سایت داشتن پروژه های زیاد در کنار تدریس است برای ساخت رزومه های بهتر برای شما",
      icon: <AiOutlineFundProjectionScreen size={50} />,
      color: "#ffe14c",
    },
  ];
  return (
    <Layout>
      <h1 className="text-center text-5xl text-gray-700 dark:text-white">
        درباره ما
      </h1>
      <div className="w-full flex justify-between mt-10 gap-20">
        <img
          src="/images/about.jpg"
          alt="image"
          className="rounded-lg w-[600px] shadow-xl"
        />
        <div className="w-full">
          <h2 className="text-center text-5xl text-gray-700 dark:text-white">
            درباره اموزشگاه بحر
          </h2>
          <p className="text-xl mt-10 w-[400px] text-center mx-auto text-gray-500 dark:text-gray-300">
            باشگاه بحر، یک مرکز آموزش برنامه نویسی پیشرفته است که به ارتقاء
            مهارت‌های شما در عرصه‌ی برنامه‌نویسی و توسعه نرم‌افزار متمرکز است.
            ما به عنوان یک تیم متخصص در حوزه‌های مختلف برنامه نویسی، اطلاعات
            کامپیوتری، و فناوری اطلاعات، تلاش می‌کنیم تا به شما بهترین منابع
            آموزشی و تجربیات عملی را ارائه دهیم.
          </p>
          <div className="flex justify-center gap-5 mt-10">
            <Link href="/courses">
              <button className="text-white rounded-full px-4 py-1 bg-green-500">
                شروع یادگیری
              </button>
            </Link>
            <a href="#why-us">
              <button className="text-white rounded-full px-4 py-1 bg-gray-500">
                چرا ما را انتخاب کنید
              </button>
            </a>
          </div>
          <img
            src="/images/logo.png"
            alt="logo"
            className="mx-auto mt-14 w-[200px]"
          />
        </div>
      </div>
      <div className="w-full mt-24" id="why-us">
        <h1 className="text-center text-4xl">چرا ما بهترین هستیم؟</h1>
        <ul className="flex justify-between items-center flex-row flex-wrap mt-10 gap-y-5">
          {whyUsItems.map((item) => (
            <WhyUs {...item} />
          ))}
        </ul>
      </div>
      <div className="w-full mt-20">
        <h1 className="text-center text-4xl">اهداف ما</h1>
        <div className="w-full flex justify-between mt-10 gap-10">
          <div className="w-[50%]">
            <img src="/images/logo.png" className="mx-auto" alt="logo" />
            <p className="text-xl text-center leading-10">
              "اموزشگاه بحر، یک جایگاه ممتاز برای یادگیری و پیشرفت در دنیای
              برنامه‌نویسی و فناوری اطلاعات است. با بیش از 10 سال تجربه در زمینه
              آموزش، ما به دانشجویان ابزارها و منابعی ارائه می‌دهیم که آن‌ها را
              در ساخت مهارت‌های مورد نیاز برای توسعه نرم‌افزارهای برتر و
              وب‌سایت‌های حرفه‌ای یاری می‌دهد. تعهد ما به کیفیت و توسعه فردی شما
              را از سایر منابع آموزشی متمایز می‌کند. از دوره‌های متنوع و کاربردی
              گرفته تا پروژه‌های عملی و تیم اساتید متخصص، همه چیز در اختیار شما
              قرار دارد تا به شما در پیشبرد مسیر حرفه‌ای خود کمک کند. در
              "اموزشگاه بحر"، ما به ارائه دسترسی به علم و توانمندی‌های
              برنامه‌نویسی برای همه افراد پی‌بریم، از افراد مبتدی تا حرفه‌ایان
              با تجربه. بیایید با ما همراهی کنید تا بهترین نسخه از خودتان را در
              دنیای تکنولوژی و برنامه‌نویسی پیدا کنید.
            </p>
          </div>
          <img
            src="/images/goals.jpg"
            alt="goals"
            className="w-[30%] rounded-lg mx-auto shadow-xl"
          />
        </div>
        <div>
          <h1 className="text-center text-4xl mt-40">
            یادگیری را با ما شروع کن
          </h1>
          <p className="text-center mx-auto dark:text-gray-200 w-[40%] text-xl mt-10">
            در "اموزشگاه بحر"، ما آماده‌ایم شما را در سفر یادگیری و توسعه
            حرفه‌ای در دنیای برنامه‌نویسی همراهی کنیم. با دسترسی به دوره‌های
            گسترده و متنوع، اساتید ما با تجربه، و ابزارهای آموزشی پیشرفته، ما به
            شما امکان می‌دهیم تا مهارت‌های لازم برای ایجاد نرم‌افزارهای برتر و
            وب‌سایت‌های فوق‌العاده را به دست آورید.
          </p>
          <div className="w-full flex justify-center mt-5">
            <Link href="/courses">
              <button className="text-white rounded-full px-6 py-3 bg-green-500 mx-auto text-xl shadow-md dark:shadow-md dark:shadow-gray-700 shadow-gray-500">
                شروع یادگیری
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default about;
