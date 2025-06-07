import React from 'react'

function ErrorIcon({ field,errors }) {
     if (!errors[field]) return null;
     const errorMessage = errors[field];
  return (
    
        <div className="relative inline-block ml-2">
                <span
                  className="text-red-500 text-lg font-bold cursor-help animate-pulse"
                  title={errorMessage}
                >
                  *
                </span>
                {/* Tooltip personalizado */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-red-600 text-white text-xs rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-lg">
                  {errorMessage}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
                </div>
              </div>
    
  )
}

export default ErrorIcon