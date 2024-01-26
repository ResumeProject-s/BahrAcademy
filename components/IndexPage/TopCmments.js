import { TopCommentData } from "@/DB/DataBase";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Swiper } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";
import { AiTwotoneStar } from "react-icons/ai";

const TopCmments = ({ comments }) => {
  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowSize(window.innerWidth);
      window.addEventListener("resize", () => {
        setWindowSize(window.innerWidth);
      });
    }
  }, []);

  return (
    <div className="mt-16 w-full pt-3 px-10 h-[380px]">
      <div className="flex justify-center px-4 items-center mb-9 h-[10%]">
        <h1 className="md:text-3xl sm:text-2xl text-xl dark:text-white text-[#4c5c84]">
          مردم چه میگویند
        </h1>
      </div>
      <div className="relative w-full h-[80%]">
        <Swiper
          slidesPerView={windowSize >= 1280 ? 4 : windowSize >= 800 ? 2 : 1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper absolute w-full h-full top-0 right-0 text-black"
        >
          {comments.map((comment, index) => (
            <SwiperSlide key={comment.id}>
              <div
                className="p-5 h-full bg-white dark:bg-black rounded-lg cursor-grab overflow-y-auto"
                data-aos="fade-up"
                data-aos-delay={Number(index) * 100}
              >
                <div className="flex items-center gap-5 h-[20%] mb-5">
                  <img
                    src={comment.profile}
                    alt="profile"
                    className="w-[20%] rounded-full"
                  />
                  <div className="text-[#9aa3ba] dark:text-gray-300 w-[75%]">
                    <span className="p-1 block w-full">{comment.fullName}</span>
                    <div className="flex justify-center items-center gap-1 bg-[#ffca58] px-1 rounded-md text-[#d89f24] w-10">
                      <AiTwotoneStar />
                      <span className="text-white">{comment.star}</span>
                    </div>
                  </div>
                </div>
                <p className="h-[fit] text-lg text-[#667496] dark:text-gray-400">
                  {comment.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopCmments;
