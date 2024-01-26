import { AiOutlineUser } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdOutlineVideoLibrary } from "react-icons/md";
import { EffectCoverflow, EffectFade, Navigation } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsLinkedin } from "react-icons/bs";
import { RiArticleLine } from "react-icons/ri";
import CountUp from "react-countup";

const Teacher = (props) => {
  return (
    <div className="mt-14">
      <div className="justify-between px-4 items-center mb-9 xl:hidden flex">
        <h1 className="md:text-3xl sm:text-2xl text-xl dark:text-white text-[#4c5c84]">
          مدرسین
        </h1>
        <button className="text-[#2196f3] md:text-base sm:text-sm text-xs border border-[#2196f3] px-4 py-[2px] h-8 rounded-md hover:text-white hover:bg-[#2196f3] transition-colors flex items-center">
          مشاهده همه
          <MdKeyboardArrowLeft />
        </button>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-3 gap-5 xl:h-auto h-[400px]">
        <div
          className="col-span-1 rounded-lg bg-[#eaecf1] dark:bg-black p-7 xl:block hidden"
          data-aos="fade-left"
        >
          <div className="flex justify-between px-2 items-center">
            <div className="flex justify-center gap-3 items-center">
              <AiOutlineUser
                className="text-[#333] dark:text-white"
                size={"30px"}
              />
              <span className="text-[#333] dark:text-white">مدرسین</span>
            </div>
            <div>
              <button className="text-[#2196f3] md:text-sm text-xs border border-[#2196f3] px-4 py-[2px] h-8 rounded-md hover:text-white hover:bg-[#2196f3] transition-colors flex items-center">
                مشاهده همه
                <MdKeyboardArrowLeft />
              </button>
            </div>
          </div>
          <div className="w-[80%] mx-auto mt-5 overflow-hidden h-full">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow]}
              className="mySwiper rounded-xl"
            >
              {props.teachers.map((teacher) => (
                <SwiperSlide key={teacher.id}>
                  <div className="relative">
                    <img
                      src={
                        teacher.pictureAddress || "/images/icons/profile.jpg"
                      }
                      className="w-full h-[250px]"
                    />
                    <div className="bg-white dark:bg-[#2e2e2e] text-[#333] dark:text-white text-center leading-3 text-lg p-4">
                      {teacher.fullName || "teacher"}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div
          className="col-span-3 rounded-lg bg-[#eaecf1] dark:bg-black h-[100%] relative p-3"
          data-aos="flip-left"
        >
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper mySwiper !absolute top-0 right-0 h-full w-full"
          >
            {props.teachers.map((teacher) => (
              <SwiperSlide
                className="w-full h-full p-10 px-20 rounded-lg overflow-hidden md:bg-[#eaecf1] dark:bg-black overflow-y-auto"
                key={teacher.id}
              >
                <div className="w-full h-full md:flex gap-5">
                  <div className="md:h-full md:w-[200px] h-[100px] w-[100px] md:rounded-xl rounded-full overflow-hidden mx-auto">
                    <img
                      src={
                        teacher.pictureAddress || "/images/icons/profile.jpg"
                      }
                      alt="profile"
                      className=" h-full object-contain bg-white mx-auto border-4 border-white mb-3"
                    />
                  </div>
                  <div className="md:w-[80%] w-full mt-5">
                    <h1 className="text-black dark:text-white text-4xl md:text-right text-center">
                      {teacher.fullName || "teacher"}
                    </h1>
                    {teacher.linkdinProfileLink ? (
                      <div className="flex w-full md:justify-start justify-center gap-3 items-center text-[#2396f3] mt-5">
                        <BsLinkedin size={"50px"} className="cursor-pointer" />
                        <span className="text-xl">
                          {teacher.linkdinProfileLink}@
                        </span>
                      </div>
                    ) : null}
                    <div className="flex justify-center gap-44 mt-5 w-full text-[#2396f3]">
                      <div>
                        <span className="text-center text-3xl block text-gray-700 ">
                          دوره ها
                        </span>
                        <MdOutlineVideoLibrary size={130} color="" />
                        <span className="text-4xl block text-center">
                          <CountUp
                            start={0}
                            end={teacher.courseCounts}
                            duration={4}
                          />
                        </span>
                      </div>
                      <div>
                        <span className="text-center text-3xl block text-gray-700 ">
                          مقالات
                        </span>
                        <RiArticleLine size={130} color="" />
                        <span className="text-4xl block text-center">
                          <CountUp
                            start={0}
                            end={teacher.newsCount}
                            duration={4}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
