import React, {useState} from "react";
import Button from "./Button";

const CheckoutForm = () =>{

    const [modoEntrega, setModoEntrega] = useState('delivery')

    return(
        
        <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4 text-center">TIPO DE ENTREGA</h3>

            <div className="flex justify-center gap-5  mt-4 pt-4 border-t-4 border-[#663D25]">

            
                <button className={`transition duration-300 ease-in-out hover:scale-115 px-4 py-2 border rounded ${modoEntrega === 'delivery' ? 'bg-white border-gray-500 shadow' : 'border-gray-300 shadow'}`}
                 onClick={() => setModoEntrega('delivery')}
                 >
                    Delivery
                </button>

                <button className={`transition duration-300 ease-in-out hover:scale-115 px-4 py-2 border rounded ${modoEntrega === 'recojo' ? 'bg-white border-gray-500 shadow': 'border-gray-400 shadow'}`}
                onClick={()=> setModoEntrega('recojo')}
                >
                 Recojo
                 </button>
            </div>

            <div className="flex gap-4">

                <div className="flex flex-col w1/2">
                    <label className="mb-1 font-medium">Nombre</label>
                    <input type="text" placeholder="Nombre" className="bg-white w-full p-2 border border-gray-400 shadow rounded" />
                    
                </div>

                <div className=" flex flex-col w1/2">
                    <label className="w-57 mb-1 font-medium">Apellidos</label>
                    <input type="text" placeholder="Apellidos" className="bg-white w-full p-2 border border-gray-400 shadow rounded" />
                </div>
            </div>

          
            <label className="font-medium">Correo</label>
            <input type="text" placeholder="@gmail.com" className="bg-white w-full p-2 border border-gray-400 shadow rounded" />
                
                
                {modoEntrega === 'delivery' && (

        <div className="flex gap-4">
            <div className="flex flex-col w1/2">
                  <label className="mb-1 font-medium">Direccion</label>
                   <input type="text" placeholder="Direccion" className="bg-white w-full p-2 border border-gray-400 shadow rounded" />

            </div>

            <div className="flex flex-col w1/2">
                   <label className="mb-1 font-medium">Distrito</label>
                <select className="bg-white w-57 p-2 border border-gray-400 shadow rounded" >
                    <option value=""></option>
                    <option value="Distrito1"> Distrito 1</option>
                    <option value="Distrito2"> Distrito 2</option>
                </select>



            </div> 
            
        </div>
                )}
            <label className="mb-1 font-medium">Referencia</label>
            <input type="text" placeholder="Referencia" className="bg-white w-full p-2 border border-gray-400 shadow rounded" />               

        </div>
    )
}

export default CheckoutForm