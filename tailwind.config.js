export default {
  theme: {
    backgroundImage: {
      'field-lines': "url('/assets/field-marks.svg')",
    },
    colors: {
      'custom-green-500': '#29b473',
      'custom-green-400': '#94d9ba',
    },
    extend: {
      fontFamily: {
        anta: ['var(--font-anta)', 'sans-serif'],
      },
    },
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
};
