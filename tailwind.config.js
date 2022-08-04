const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          750: "#004D1A",
          250: "#E8FFEC",
          150: "#7DFFA9",
        },
        rose: {
          250: "#FFE8E8",
        },
        gray: {
          350: "#F3F3F3",
          450: "#F2F2F2",
          750: "#E6E6E6",
        },
        cyan: {
          250: "#7DFFFF",
        },
      },
    },
  },
  plugins: [],
};
