import Layout from "@/layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import {
  LatestArticlesData,
  LatestNewsData,
  newsAndArticlesData,
} from "@/DB/DataBase";
import FilterBar from "@/components/common/FilterBar";
import { useEffect, useRef, useState } from "react";
import { HiShare } from "react-icons/hi";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import * as _ from "lodash";
import Link from "next/link";
import NewsAndArticleCart from "@/components/news&Articles/NewsAndArticleCart";

const index = () => {
  const [mainNewsAndArtiles, setmainNewsAndArtiles] =
    useState(newsAndArticlesData);
  const [selectedFilter, setSelectedFilter] = useState("همه");
  const [selectedSort, setselectedSort] = useState(1);
  const [itemsSelectedItemsPerPage, setItemsSelectedItemsPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(1);
  const [windowSize, setWindowSize] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const filterSelect = useRef();
  const sortSelect = useRef();
  const itemsPerPage = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize(window.innerWidth);
      window.addEventListener("resize", () => {
        setWindowSize(window.innerWidth);
      });
    }
  }, []);

  useEffect(() => {
    handleFireFilter();
  }, [selectedFilter, selectedSort, searchValue]);

  const handlePageChange = (event, value) => {
    setcurrentPage(value);
  };
  const handleFireFilter = () => {
    let updatedData = newsAndArticlesData;

    if (selectedFilter !== "همه") {
      updatedData = newsAndArticlesData.filter(
        (item) => item.categori === selectedFilter
      );
    }

    if (selectedSort === 1) {
      updatedData = _.orderBy(updatedData, "date", "desc");
    } else {
      updatedData = _.orderBy(updatedData, "date", "asc");
    }

    if (searchValue) {
      updatedData = updatedData.filter((data) =>
        data.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setmainNewsAndArtiles(updatedData);
  };

  return (
    <Layout>
      <div>
        <div className="h-[300px] relative md:top-6 ">
          <h1 className="font-bold text-2xl text-center mb-5">
            جدید ترین اخبار و مقالات
          </h1>
          <Swiper
            slidesPerView={windowSize >= 1200 ? 3 : windowSize > 700 ? 2 : 1}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="w-full h-full mb-14"
            loop={true}
          >
            {newsAndArticlesData
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 6)
              .map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="w-full h-full rounded-lg p-3 overflow-hidden">
                    <NewsAndArticleCart {...item} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="bg-white dark:bg-black text-white w-full h-14 mt-28 rounded-lg p-3 flex justify-between">
          <div className="flex gap-4">
            <select
              onChange={() => {
                setSelectedFilter(filterSelect.current.value);
              }}
              ref={filterSelect}
              name="filter"
              className="bg-[#2196f3] p-1 block rounded-md md:h-auto md:w-auto w-16 text-xs sm:text-sm md:text-base"
            >
              <option value={"همه"} selected>
                همه
              </option>
              {[
                { id: 1, title: "اخبار" },
                { id: 2, title: "مقالات" },
              ].map((item, index) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="bg-[#f5f5f5] dark:bg-[#2e2e2e] rounded-md outline-none text-black dark:text-white shadow-md text-sm pr-3 sm:inline hidden"
              placeholder="جستجو"
              onChange={(event) => setSearchValue(event.target.value)}
              value={searchValue}
            />
          </div>
          <div className="flex gap-4">
            <select
              onChange={() => {
                setselectedSort(Number(sortSelect.current.value));
              }}
              ref={sortSelect}
              name="sort"
              className="bg-[#2196f3] p-1 block rounded-md md:h-auto md:w-auto w-21 text-xs sm:text-sm md:text-base"
            >
              {[
                { id: 1, title: "جدید ترین" },
                { id: 2, title: "قدیمی ترین" },
              ].map((item, index) => (
                <option key={item.id} value={item.id} selected={!index}>
                  {item.title}
                </option>
              ))}
            </select>
            <select
              name="itemsPerPage"
              ref={itemsPerPage}
              className="bg-[#2196f3] p-1 block rounded-md md:h-auto md:w-auto w-10 text-xs sm:text-sm md:text-base px-3"
              onChange={() => {
                setItemsSelectedItemsPerPage(itemsPerPage.current.value);
                setcurrentPage(1);
              }}
            >
              <option value="4" selected>
                4
              </option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          className="bg-white dark:bg-black py-3 rounded-md outline-none text-black dark:text-white shadow-md text-sm pr-3 sm:hidden inline w-full mt-5"
          placeholder="جستجو"
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
        />
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-7 mt-8">
          {mainNewsAndArtiles.length ? (
            mainNewsAndArtiles
              .slice(
                currentPage * itemsSelectedItemsPerPage -
                  itemsSelectedItemsPerPage,
                currentPage * itemsSelectedItemsPerPage
              )
              .map((item) => <NewsAndArticleCart {...item} />)
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
        <div dir="ltr" className="flex justify-center mt-9">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(
                mainNewsAndArtiles.length / itemsSelectedItemsPerPage
              )}
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
    </Layout>
  );
};

export default index;
