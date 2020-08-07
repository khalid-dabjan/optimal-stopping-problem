module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans-serif"]
      },
      colors: {
        primary: "#FF8C42",
        grey: "#FFFFFC",
        "grey-darker": "#AAA",
        secondary: "#6699CC",
        black: "#020122",
        red: "#E63946",
        green: "#2A9d8F"
      },
      fill: theme => ({
        primary: theme("colors.primary"),
        grey: theme("colors.grey"),
        "grey-darker": theme("colors.grey-darker"),
        secondary: theme("colors.secondary"),
        black: theme("colors.black"),
        red: theme("colors.red"),
        green: theme("colors.green"),
        white: theme("colors.white")
      })
    }
  },
  variants: {},
  plugins: []
};
