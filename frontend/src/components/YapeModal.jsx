import React from 'react';

const YapeModal = ({ onClose }) => (
<div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(100,100,100,0.4)] transition-colors duration-300">
    <div
      className="bg-white p-8 rounded-lg shadow-lg relative w-[350px] transform transition-all duration-300 scale-95 opacity-0 animate-modalIn"
    >
        <button
                className="absolute top-2 right-2 text-xl font-bold"
                onClick={onClose}
            >
                ×
            </button>
        
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Paga con Yape</h2>
            <img
            src="/src/assets/Codigo_QR_Yape.png"
            alt="Codigo_QR_Yape"
            width={150}
            height={150}
            className="mb-6"
            />
            <p>Escanea el código QR con tu app Yape para pagar.</p>
        </div>
        
        
    </div>
    <style>
      {`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-modalIn {
          animation: modalIn 0.3s ease-out forwards;
        }
      `}
    </style>
</div>
);

export default YapeModal;