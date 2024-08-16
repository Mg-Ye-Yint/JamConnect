import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        bungee: ['Bungee Shade', 'cursive'],
        gugi: ['Gugi', "static"],
        archivoBlack: ['Archivo_Black', 'static']
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        headerDown: {
          '0%': { transform: 'translateY(-150%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        myPulse: {
          '0%': { opacity: '0'},
          '100%': {opacity: '1'}
        },
        titleBounce: {
          '0%': {transform: 'translateX(0)'},
          '50%': {transform: 'translateX(30px)'},
          '100%': {transform: 'translateX(0)'},
        }
        
      },
      animation: {
        slideInLeft: 'slideInLeft 3s ease-out forwards',
        headerDown: "headerDown 1.5s ease-in forwards",
        myPulse: "myPulse 3s linear forwards",
        titleBounce1: "titleBounce 3s 0.2s  alternate infinite",
        titleBounce2: "titleBounce 3s  0.4s alternate infinite",
        titleBounce3: "titleBounce 3s   0.6s alternate infinite",
        titleBounce4: "titleBounce 3s 0.8s alternate infinite",
        titleBounce5: "titleBounce 3s    1s alternate infinite",
        titleBounce6: "titleBounce 3s 1.2s alternate infinite",
        titleBounce7: "titleBounce 3s  1.4s alternate infinite",
        titleBounce8: "titleBounce 3s   1.6s alternate infinite",
        titleBounce9: "titleBounce 3s   1.8s alternate infinite",
        titleBounce10: "titleBounce 3s  2s alternate infinite",
        titleBounce11: "titleBounce 3s  2.2s alternate infinite",
        titleBounce12: "titleBounce 3s  2.4s alternate infinite",

        smTitleBounce1: "titleBounce 3.5s 0.19s  alternate infinite",
        smTitleBounce2: "titleBounce 3.5s  0.2s alternate infinite",
        smTitleBounce3: "titleBounce 3.5s  0.3s alternate infinite",
        smTitleBounce4: "titleBounce 3.5s 0.4s alternate infinite",
        smTitleBounce5: "titleBounce 3.5s  0.5s alternate infinite",
        smTitleBounce6: "titleBounce 3.5s 0.6s alternate infinite",
        smTitleBounce7: "titleBounce 3.5s  0.7s alternate infinite",
        smTitleBounce8: "titleBounce 3.5s   0.8s alternate infinite",
        smTitleBounce9: "titleBounce 3.5s  0.9s alternate infinite",
        smTitleBounce10: "titleBounce 3.5s 1s alternate infinite",
        smTitleBounce11: "titleBounce 3.5s  1.1s alternate infinite",
        smTitleBounce12: "titleBounce 3.5s  1.2s alternate infinite",
      },
      boxShadow: {
        'realistic': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'deep': '0 10px 20px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      zIndex: {
        '1000': '1000',  
        '60': '60',
        '2000': "2000"
      }
    },
  },
  plugins: [],
};
export default config;
