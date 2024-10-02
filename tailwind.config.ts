// tailwind.config.js
const {nextui} = require("@nextui-org/react");
import defaultTheme from "tailwindcss/defaultTheme"


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monserrat: ["Montserrat", defaultTheme.fontFamily.sans]
      },
       screen: {
        "xs": "300px"
       }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

