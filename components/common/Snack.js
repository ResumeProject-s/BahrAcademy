import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

const Snack = ({ time, title, status }) => {
  const [snackOpen, setSnackOpen] = useState(false);
  useEffect(() => {
    setSnackOpen(true);
  });

  return (
    <div
      className={`fixed bottom-3 left-3 p-3 text-white rounded-md ${
        status === "seccess" ? "bg-green-500" : "bg-red-500"
      } ${snackOpen ? "block" : "hidden"} z-[1]`}
    >
      <p>{title}</p>
    </div>
  );
};

export default Snack;
