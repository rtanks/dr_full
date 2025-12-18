/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#2C8073",
        "676767": "#676767",
        "898989": "#898989",
        "a7a7a7": "#a7a7a7",
        "575757": "#575757",
        "select": "#2e7d32",
        "unselect": "#555",
        "select-container": "#e8f5e9",
        "unselect-container": "#f0f0f0",
        "blue-main": "#006ECF;",
        "disable-container" : '#e0e0e0',
        "disable": '#757575',
        "success": '#28a745',
        "failed": "#dc3545",
      }
    },
  },
  plugins: [],
}

/* @theme {
    --shadow-my: 0px 0px 7px #6a99;
    --drop-shadow-my: 1px 1px 1px #2C807377;
    --bg-selected : #2C8073;
    --color-898989: #898989;
    --color-a7a7a7: #a7a7a7;
    --color-main: #2C8073;
    --color-676767: #676767;
    --color-757575: #757575;
    --color-blue-main: #006ECF;
    --color-select-container: #e8f5e9;
    --color-select: #2e7d32;
    --color-unselect: #555;
    --color-unselect-container: #f0f0f0;
    --color-disable-container: #e0e0e0;
    --color-disable: #757575;
    --color-success: #28a745;
    --color-failed: #dc3545;
} */