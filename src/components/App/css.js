import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  "@keyframes App-logo-spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  },
  "@media (prefers-reduced-motion: no-preference)": {
    appLogo: {
      animation: "$App-logo-spin infinite 20s linear"
    }
  },
  app: {
    textAlign: "center"
  },
  appLogo: {
    height: "40vmin",
    pointerEvents: "none"
  },
  appHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  },
  appLink: {
    color: "#61dafb"
  }
});

export default useStyles;
