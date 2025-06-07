import React from "react";
import { Link } from "react-router-dom";

const LinkNavBurger = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      className="flex items-center  px-4 py-2 hover:bg-[#e2b891] hover:text-[#663d25] hover:font-semibold"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default LinkNavBurger;