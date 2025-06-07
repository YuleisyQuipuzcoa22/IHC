import { Link } from "react-router-dom";

const LinkMenuUsuario = ({ to, icon: Icon, children, onClick }) => {
  return (
    <Link
      to={to}
      className="flex items-center h-[45px] gap-2 px-4 py-2 hover:bg-[#FFD8DE]"
      onClick={onClick}
    >
      {Icon && <Icon className="text-[#663D25]" />}
      {children}
    </Link>
  );
};

export default LinkMenuUsuario;
