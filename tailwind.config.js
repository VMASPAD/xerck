/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...existing code...
  
  theme: {
    extend: {
      // ...existing code...
      
      animation: {
        // ...existing code...
        
        // Animación de pulso más lenta y suave
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        
        // Definiendo la animación de shimmer también en caso de que no exista
        "shimmer": "shimmer 4s ease-in-out infinite",
      },
      keyframes: {
        // ...existing code...
        
        // En caso de que no exista una definición para shimmer
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  
  // ...existing code...
}