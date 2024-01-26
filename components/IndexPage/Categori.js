import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Categori = (props) => {
  const categori = useRef();

  // export const CategoriData = [
  //   { id: 1, title: "فرانت اند", color:  },
  //   { id: 2, title: "بک اند", color:  },
  //   { id: 3, title: "بازی سازی", color:  },
  //   { id: 4, title: "طراحی وب", color:  },
  //   { id: 5, title: "هوش مصنوعی", color: ["#4be3bc", "#5cec89"] },
  //   { id: 6, title: "دیتابیس", color: ["#ffc079", "#fd7ab0"] },
  // ];
  const colors = [
    ["#4be3bc", "#5cec89"],
    ["#ffc079", "#fd7ab0"],
    ["#1878fc", "#62a9fd"],
    ["#bb37fb", "#7344ec"],
  ];

  useEffect(() => {
    categori.current.style.background = `linear-gradient(90deg , ${
      colors[props.index % 4][0]
    }, ${colors[props.index % 4][1]})`;
  });
  return (
    <Link href={`/courses/?categori=${props.techName}`}>
      <div
        className={`rounded-md text-white col-span-1 bg-red-300 cursor-pointer shadow-xl h-24 p-4 text-center leading-[4rem] lg:text-2xl lg:leading-[4rem] text-lg`}
        data-aos="fade-up"
        data-aos-delay={Number(props.index) * 100}
        ref={categori}
      >
        <span>{props.techName}</span>
        <p className="text-sm leading-[0]">{props.describe}</p>
      </div>
    </Link>
  );
};

export default Categori;
