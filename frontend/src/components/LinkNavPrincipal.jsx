import { Link } from "react-router-dom";

const LinkNavPrincipal = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="relative text-[#FFFFFF]          
          focus:text-[#E2B891]
          hover:after:w-full 
          after:transition-all 
          after:duration-300 
          after:block after:absolute 
          after:bottom-0 
          after:left-0 
          after:h-[2px] 
          after:bg-[#E2B891] 
          after:w-0 "
    >
      {children}
    </Link>
  );
};

export default LinkNavPrincipal;