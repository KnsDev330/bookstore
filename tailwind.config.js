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
            facebook: '#3b5998',
            twitter: '#1da1f2',
            linkedin: '#0077b5',
            pinterest: '#e60023'
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