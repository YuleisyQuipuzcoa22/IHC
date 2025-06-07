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
        imageUrl="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/246709077_4461906080572576_5973976528498273501_n.png?stp=dst-png_s600x600&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEMlu8555LS0a4Syjb2aS8voqLhx80lfdaiouHHzSV91nKXr2raFA-Bd3KENUUz0R9hjQHa_6t1X9EFmMnFz2GE&_nc_ohc=dU_CUMMngTwQ7kNvwFDcY59&_nc_oc=AdmIO9h0KckgujOBOMlJDsq-tH0CJN99g1JTJSp7VVaxpYQ2v45lFCX8y3k3tp-p7q8&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=Pl2w-EMsXI0ng5HIZohTyA&oh=00_AfL2_iuLal_UAAZwkymi3gBnT31h_kc_66aPA9MZEySIyA&oe=6843B7C4"
        linkTo="/sede"
        texto="Sedes"
      />
      <CardMenu
        imageUrl="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/481705638_9215333775229759_2827040526207789934_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFoD88BFbEKhenDAILluhIMK1Pda19bz7UrU91rX1vPtUWqAzdd1RIRDZZkZLTDL0l1CoYrLEXrI_VvRZjoa2bE&_nc_ohc=aWDBxTiru7UQ7kNvwG43S67&_nc_oc=AdlJQ0eAcBczxmcdw4zDAJRJng93zyxMXastlowVIVbfPWlNxZOytb-cFX8oGvErCcw&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=DoGsJ6cdBJ6JsYF90tEcAg&oh=00_AfIV21UFa-T2BM1C1j7OxId9JHk33U8TYli_tPnh5a2ELw&oe=6843AD66"
        linkTo="/asistente"
        texto="Asistentes"
      />
    </div>
  );
}
export default Admin;
