import React from "react";

const DashboardCard = React.forwardRef(({ icon, value, label }, ref) => (
  <div className="w-64 flex flex-col items-center">
    <img
      src={icon}
      alt={label}
      className="mb-2 w-25 h-auto"
    />
    <div
      ref={ref}
      className="text-6xl font-extrabold text-[#E8464D] leading-none mb-2 animate-pulse"
    >
      {value}
    </div>
    <p className="text-xl md:text-2xl font-bold text-[#E8464D] text-center">
      {label}
    </p>
  </div>
));

export default DashboardCard;