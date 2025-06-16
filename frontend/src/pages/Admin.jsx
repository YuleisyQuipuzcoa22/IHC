import React from "react";
import { Link } from "react-router-dom";
import CardMenu from "../components/CardMenu";

function Admin() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 px-10 py-10 ">
      <CardMenu
        imageUrl="https://st2.depositphotos.com/1672917/9875/i/450/depositphotos_98751852-stock-photo-birthday-cake-with-sweet-and.jpg"
        linkTo="/producto"
        texto="Productos"
      />
      <CardMenu
        imageUrl="https://www.esic.edu/sites/default/files/rethink/ff01cba7-marketing-y-ventas-roi.jpg"
        linkTo="/dashboard_admin"
        texto="Dashboard's"
      />
      
    </div>
  );
}
export default Admin;
