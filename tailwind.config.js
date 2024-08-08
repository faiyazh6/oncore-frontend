module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        'custom-blue': '#0D1A47',
        customBg: '#F4F8FD',
        customBlue: {
          light: '#91B1FF',
          DEFAULT: '#222E93',
          dark: '#324178',
        },
        acuityHigh: '#FF5A5F', // example color, replace with actual color from Figma
        acuityMid: '#FFC107',  // example color, replace with actual color from Figma
        acuityLow: '#28A745',  // example color, replace with actual color from Figma
        headerBg: '#F0F4FF',   // example color, replace with actual color from Figma
        headerText: '#2D3A4B', // example color, replace with actual color from Figma
        gantt: {
          high: '#405AB3',
          mid: '#5A80F6',
          low: '#7E9CF9'
        }
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      zIndex: {
        '50': '50',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'), // For the `prose` class
  ],
}