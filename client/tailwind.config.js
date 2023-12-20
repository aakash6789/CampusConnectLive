/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily:{
        playfair:["Playfair Display","serif"],
        opensans:["Open Sans","sans-serif"],
        bodyFont:["Poppins","sans-serif"],
        tittleFont:["Montserrat","sans-erif"],
        bebasNeue:["Bebas Neue","sans-serif"],
        roboto:["Roboto","sans-serif"],
        robotoSlab:["Roboto Slab","sans-serif"]
      },

    },

    screens:{
      // 'xl':{'max':'1220px'},
      // 'lg':{'max':'991px'}, xs:480px
      // 'md':{'max':'767px'},
      // 'sm':{'max':'550px'},
      // 'xsm':{'max':'375px'},
      xs:"480px",
      sm:"768px",
      md:"1060px "
    }
  },
  plugins: [],
}