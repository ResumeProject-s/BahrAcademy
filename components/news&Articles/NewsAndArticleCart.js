import Link from "next/link";
import React, { useState } from "react";
import { HiShare } from "react-icons/hi";

const NewsAndArticleCart = ({ id, image, title, categori, desceiption }) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  return (
    <Link href={`/news&Articles/${id}`}>
      <div
        className="md:h-full rounded-lg p-3 text-sm cursor-pointer relative bg-white dark:bg-black h-full shadow-md"
        onMouseOver={() => setDescriptionOpen(true)}
        onMouseLeave={() => setDescriptionOpen(false)}
      >
        <img src={image} alt={title} className="rounded-md w-full h-[80%]" />
        <h3 className="mt-4">{title}</h3>
        <div className="flex justify-between mt-2">
          <HiShare color="#2396f3" />
          <span className="text-[#2396f3]">{categori}</span>
        </div>
        <div
          className={`w-full overflow-hidden ${
            descriptionOpen ? "opacity-90" : "opacity-0"
          } bg-white dark:bg-black absolute top-0 transition-opacity duration-500 right-0 rounded-b-xl text-sm px-3 text-gray-700`}
        >
          <p className="my-3 text-gray-700 dark:text-white">{desceiption}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsAndArticleCart;
