/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            'primary': '#F65D4E',
            'primary-hover': '#f4402f',
            'border': '#E6E6E6',
            'text': '#444444',
            'accent': '#000000',
            'lighter': '#999999',
         },
         fontSize: {
            heading: '32px',
            footerHeading: '16px'
         },
         fontWeight: {
            heading: 600
         },
         spacing: {
            heading: '2px'
         },
         screens: {
            xss: '320px',
            xs: '480px'
         },
         backgroundColor: {
            'primary-light': '#ffcec9'
         },
         fill: {
            rating: '#fa8c17'
         }
      },
   },
   plugins: [],
}