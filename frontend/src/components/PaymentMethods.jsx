import React from "react";

const PaymentMethods =()=>{

    return(

        <div className="text-center mt-6">
            <h4 className=" text-lg font-bold mb-4 text-center">MÉTODOS DE PAGO</h4>
            <div className="flex justify-center items-center gap-4 text 2xl mb-4 border-t-4 border-[#663D25] pt-4">
            
            


            <div className="flex flex-col justify-center items-center gap-4 w-full">    
                <div className="flex gap-1 text-4xl mb-1">
                    <img src='/src/assets/yape.png' className="w-50 duration-300 ease-in-out hover:scale-110"></img>
                    <img src='/src/assets/BCP.png' className="w-35 h-18 mt-4 transition duration-300 ease-in-out hover:scale-110"></img>

                 </div>

                <button className="font-bold bg-amber-700 text-white py-3 px-50 rounded hover:bg-amber-800 transition duration-300 ease-in-out hover:scale-104 ">Pagar
                </button>
                
                 <button className="border border-amber-900 text-amber-900 py-3 px-38 rounded hover:bg-amber-100 transition duration-300 ease-in-out hover:scale-104">Seguir comprando

                 </button>
                 
            </div>
            </div>
        
        </div>
        
    )
}
export default PaymentMethods