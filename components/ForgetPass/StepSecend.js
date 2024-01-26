import { MdOutgoingMail } from "react-icons/md";

const StepSecend = () => {
  return (
    <div className="">
      <h1 className="dark:text-white text-black text-center text-2xl">
        یک لینک در ایمیل شما ارسال شد
      </h1>
      <div className="flex justify-center w-full">
        <img
          src="/images/accessUserPanel.jpg"
          alt="image"
          className="w-full rounded-xl mt-16"
        />
      </div>
      <div className="w-full flex justify-center items-center gap-3 text-black dark:text-white mt-5">
        <span className="text-xl">رفتن به صفحه ایمیل ها</span>
      </div>
      <div className="relative w-fit mx-auto pt-3">
        <a
          href="https://mail.google.com/"
          className="w-32 h-12 bg-[#2396f3] text-white text-center rounded-md relative leading-[50px] text-sm flex justify-center items-center gap-3 border border-gray-300"
        >
          <span>Gmail</span>
          <MdOutgoingMail size={25} />
        </a>
      </div>
    </div>
  );
};

export default StepSecend;
