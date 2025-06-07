import React from "react";

const orderSummary =({subtotal})=>{
    return(
    <div className=" ">
        <h3 className="pt-10 text-lg font-bold mb-1 text-center">RESUMEN DE LA ORDEN</h3>
        <p className="flex justify-between mt-6 border-t-4 border-[#663D25] pt-4">
            <span className="text-sm font-semibold">Subtotal:</span>
            <span className="text-sm font-semibold">S/.{subtotal.toFixed(2)}</span>
            

        </p>
        <p className="pt-8 flex justify-between ">
            <span className="text-base font-bold">Total:💰</span>
            <span className="text-base font-bold text-gray-700 " >S/.{subtotal.toFixed(2)}</span>

        </p>

    </div>

    )
   


}

export default orderSummary