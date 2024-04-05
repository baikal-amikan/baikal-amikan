import { createTheme } from "@mui/material";

const customFont = {
  fontFamily: "futura-pt, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontsStyle: "normal",
  fontWeight: 400,
  lineHeight: 1.2,
};

const customTitle = {
  fontFamily: "verveine, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontsStyle: "normal",
  lineHeight: 1.2,
};

const theme = createTheme({
  typography: {
    ...customFont,
    h1: { ...customTitle, fontSize: "2.5rem", fontWeight: "bold" },
    h2: { ...customTitle, fontSize: "2rem", fontWeight: "bold" },
    h3: { ...customFont, fontSize: "2rem", fontWeight: "bold" },
    h4: { ...customFont, fontSize: "1.8rem", fontWeight: "normal" },
    h5: { ...customFont, fontSize: "1.5rem", fontWeight: "normal" },
    subtitle1: { ...customFont, fontSize: "1.3rem", fontWeight: 500 },
    subtitle2: { ...customFont, fontSize: "1.2rem", fontWeight: 400 },
    body1: {
      fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      fontSize: "1.1rem",
      lineHeight: 1.6,
    },
    body2: { fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif", fontSize: "1rem", lineHeight: 1.4 },
    caption: { ...customFont, fontSize: "1rem", fontWeight: "normal", lineHeight: 1.2 },
  },
});

export default theme;
