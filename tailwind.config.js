/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      screens: {
        
        'sm': '0px',
        // => @media (min-width: 576px) { ... }
        'midSm' : '450px',
        'md': '750px',
        // => @media (min-width: 960px) { ... }
  
        'lg': '968px',
        // => @media (min-width: 1440px) { ... }
        'xl': '1300px',
        
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        special: {
          light: '#85d7ff',
          DEFAULT: '#121212',
          dark: '#009eeb',
        },
        button: '#464646',
        buttonText: '#BDBDBD',
        buttonActiveText: '#121212',
        teal: "#ADFFD8",
        green: "#228B22",
        ghostBlue: "#96D8EF",
        mint: '#231F20',
        grayOutline: '#A4A4A4',
        grayFill: '#F9F9F9',
        grayHover: '#D7D7D7'
    },


       
      
    }
  },
  plugins: [],
}
