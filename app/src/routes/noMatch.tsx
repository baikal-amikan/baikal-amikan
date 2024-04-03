import { Button, Container, Typography } from "@mui/material";
import SideMenu from "../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../components/logoBlock/LogoBlock.tsx";
import NavbarBlock from "../components/narbarBlock/NavbarBlock.tsx";
import { useSafeContext } from "../config.ts";
import { BaseContext } from "../contexts/BaseContext.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export function NoMatch() {
  const { language, dictionary } = useSafeContext(BaseContext);
  return (
    <div>
      <SideMenu />
      <LogoBlock />
      {language && dictionary ? <NavbarBlock links={[{ text: dictionary?.find((item) => item.id === "home")?.text[language], link: `/${language}/` }]} /> : "Loading..."}

      {language && dictionary ? (
        <Container maxWidth="sm">
          <Typography variant={"h2"} style={{ margin: "30px auto 10px" }}>
            404
          </Typography>
          <Typography variant={"body1"} style={{ margin: "5px auto 30px" }}>
            {dictionary.find((item) => item.id === "404")?.text[language]} <br />
          </Typography>
          <Button variant={"contained"} color={"error"} startIcon={<ArrowBackIcon />}>
            <Link to={`/${language}/`}>{dictionary.find((item) => item.id === "return")?.text[language]}</Link>
          </Button>
        </Container>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
