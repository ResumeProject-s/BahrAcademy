import React, { useEffect, useState, useRef } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LatestArticlesData } from "@/DB/DataBase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

const LastArticles = (props) => {
  const [farstArticleHover, setFarstArticleHover] = useState(false);
  const [SecendArticleHover, setSecendArticleHover] = useState(false);
  const [ThardArticleHover, setThardArticleHover] = useState(false);
  const [windowSize, setWindowSize] = useState(0);

  const topArticles = [...props.data].sort(
    (a, b) => b.currentRate - a.currentRate
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowSize(window.innerWidth);
      window.addEventListener("resize", () => {
        setWindowSize(window.innerWidth);
      });
    }
  }, []);
  return (
    <div className="mt-16 w-full pt-3 sm:px-0 px-10">
      <div className="flex justify-between px-4 items-center mb-9">
        <h1 className="md:text-3xl sm:text-2xl text-xl dark:text-white text-[#4c5c84]">
          آخرین مقالات
        </h1>
        <Link href="/news&Articles">
          <button className="text-[#2196f3] md:text-base sm:text-sm text-xs border border-[#2196f3] px-4 py-[2px] h-8 rounded-md hover:text-white hover:bg-[#2196f3] transition-colors flex items-center">
            مشاهده همه مقالات
            <MdKeyboardArrowLeft />
          </button>
        </Link>
      </div>
      <div className="hidden lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-1 md:grid-row-2 lg:grid-row-3 grid-rows-2 gap-5 h-full sm:grid">
        <div
          className={`${
            !props.data > 1 ? "col-span-2" : "col-span-3"
          } md:row-span-2 row-span-3 rounded-lg relative cursor-pointer hover:bg-slate-50 bg-white dark:bg-[#1c1c1c] flex justify-center h-[700px]`}
          data-aos="fade-left"
        >
          <img
            src={
              topArticles[0].currentImageAddressTumb || "/images/article.jpg"
            }
            alt={"/images/article.jpg"}
            className=" object-center h-full rounded-lg z-[8] object-"
          />
          <div className="absolute w-full h-full top-0 right-0 z-[9] hover:bg-[#2196f3] hover:opacity-20 rounded-lg"></div>
          <div className="absolute md:bottom-10 bottom-0 md:-right-8 right-0 shadow-sm rounded-lg p-5 md:w-[80%] w-full h-28 md:bg-white bg-white/80 md:dark:bg-black shadow-white dark:bg-black/80 transition-all md:hover:bottom-20 z-10">
            <span className="text-[#2196f3] text-xl">مقالات</span>
            <p className="text-[#55648a] md:text-4xl text-xl dark:text-white shadow-lg">
              {topArticles[0].title}
            </p>
          </div>
        </div>
        {topArticles
          .slice(0, windowSize <= 768 ? 3 : windowSize >= 1024 ? 3 : 2)
          .map((item, index) => (
            <div
              key={item.id}
              data-aos="flip-right"
              className="col-span-1 row-span-1 rounded-lg relative cursor-pointer"
              onMouseOver={() => {
                !index
                  ? setFarstArticleHover(true)
                  : index === 1
                  ? setSecendArticleHover(true)
                  : setThardArticleHover(true);
              }}
              onMouseOut={() => {
                !index
                  ? setFarstArticleHover(false)
                  : index === 1
                  ? setSecendArticleHover(false)
                  : setThardArticleHover(false);
              }}
            >
              <img
                src={item.currentImageAddressTumb || "/images/article.jpg"}
                alt={"/images/article.jpg"}
                className="rounded-lg"
              />
              <div className="absolute w-full h-full top-0 right-0 z-[9] hover:bg-[#2196f3] hover:opacity-20 rounded-lg"></div>
              <div
                className={`absolute rounded-lg p-5 w-full ${
                  (
                    !index
                      ? farstArticleHover
                      : index === 1
                      ? SecendArticleHover
                      : ThardArticleHover
                  )
                    ? "h-20"
                    : "h-0"
                } overflow-hidden transition-all bottom-0 bg-white/80 dark:bg-black/80 z-10`}
              >
                <span className="text-[#2396f3] md:text-base text-sm">
                  مقالات
                </span>
                <p className="text-[#55648a] dark:text-white md:text-xl text-xs">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full h-[300px] border-white border-8 rounded-lg overflow-hidden sm:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="w-full h-full"
        >
          {topArticles.map((item) => (
            <SwiperSlide className="h-[300px] w-full" key={item.id}>
              <div className="relative h-full">
                <img
                  src={item.currentImageAddressTumb || "/images/article.jpg"}
                  alt={"/images/article.jpg"}
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 w-full h-[30%] p-3 bg-white/80 dark:bg-black/80">
                  <span className="text-[#2196f3] text-xl">مقالات</span>
                  <p className="text-[#55648a] md:text-4xl text-sm dark:text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LastArticles;
