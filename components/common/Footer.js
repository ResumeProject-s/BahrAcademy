import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BsPhoneVibrateFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { navbar } from "@/DB/DataBase";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathName = usePathname();
  return (
    <div className="bg-[#0e5188] dark:bg-[#1c1c1c] mt-32 mb-0 text-white md:text-base text-sm">
      <main className="w-[80%] mx-auto py-5">
        <ul className=" grid-cols-1 md:grid-cols-3 grid md:gap-16">
          <li className="col-span-1">
            <div className="flex items-center justify-start">
              <img src="/images/logo.png" alt="logo" className="w-[80px]" />
              <span className=" block">آموزشگاه بحر</span>
            </div>
            <p className="my-10">
              پژوهشگاه برنامه‌نویسی "بحر" به عنوان یک مرکز تخصصی در زمینه علوم
              کامپیوتر و برنامه‌نویسی، به ارتقاء دانش و توسعه مهارت‌های فنی و
              علمی در حوزه‌های مختلف ارتباط میان انسان و ماشین، تجربه کاربری،
              تحلیل داده‌ها و نرم‌افزارهای نوین می‌پردازد. این پژوهشگاه با هدف
              پیشرفت فناوری‌های نرم‌افزاری و تسهیل در آموزش و ترویج مفاهیم
              پیشرفته برنامه‌نویسی، با استفاده از تیمی متخصص و تجربه‌ی گسترده،
              در راستای پیشبرد اهداف اجتماعی و صنعتی کشور تلاش می‌نماید.
            </p>
            <span className="flex justify-start gap-3 items-center">
              <IoLocationSharp />
              <p>تهران، کوچه موفقیت، برج انگیزه، طبقه </p>
            </span>
            <span className="flex justify-start gap-3 items-center">
              <BsPhoneVibrateFill />
              <p>09113550269</p>
            </span>
            <span className="flex justify-start gap-3 items-center">
              <MdAttachEmail />
              <p>alib.gh9898@gmail.com</p>
            </span>
          </li>
          <li className="pt-5 col-span-1">
            <h1 className=" md:text-xl text-lg font-bold mb-5">دسترسی سریع</h1>
            <ul>
              {navbar.map((item) => {
                return (
                  <Link className="w-fit" href={item.link} key={item.id}>
                    <li
                      className={`flex justify-between ${
                        item.link === pathName ? "text-[#36a0f4]" : ""
                      } items-center`}
                    >
                      <span>{item.title}</span>
                      {item.hasSubMenu ? (
                        <MdOutlineKeyboardArrowDown color="#4dabf5" />
                      ) : null}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </li>
          <li className="pt-5 col-span-1">
            <h1 className=" md:text-xl text-lg font-bold mb-5">خبرنامه</h1>
            <div className="mt-7">
              <p className="text-gray-200 my-5">
                ایمیل خود را ثبت کنید تا از آخرین تخفیف‌های سایت باخیر باشید
              </p>
              <form className="flex items-center h-14 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="ایمیل خود را وارد کنید"
                  className="pr-5 text-black w-[80%] h-full"
                />
                <button className="bg-[#2396f3] w-[20%] h-full">اشتراک</button>
              </form>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Footer;
