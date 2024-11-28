/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      colors: {
        'system-blue': 'var(--system-blue)',
        'system-green': 'var(--system-green)',
        'system-indigo': 'var(--system-indigo)',
        'system-orange': 'var(--system-orange)',
        'system-pink': 'var(--system-pink)',
        'system-purple': 'var(--system-purple)',
        'system-red': 'var(--system-red)',
        'system-teal': 'var(--system-teal)',
        'system-yellow': 'var(--system-yellow)',
        'system-gray': 'var(--system-gray)',
        'system-gray2': 'var(--system-gray2)',
        'system-gray3': 'var(--system-gray3)',
        'system-gray4': 'var(--system-gray4)',
        'system-gray5': 'var(--system-gray5)',
        'system-gray6': 'var(--system-gray6)',
      },
      animation: {
        'dynamic-island': 'dynamicIslandExpand 0.5s ease-out',
      },
      borderRadius: {
        '2xl': '22px',
      },
    },
  },
  plugins: [],
};