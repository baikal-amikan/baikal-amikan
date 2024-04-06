import css from "./MainPage.module.scss";
import { Link } from "react-router-dom";
import { BaseContext } from "../../contexts/BaseContext.tsx";
import { useSafeContext } from "../../config.ts";
import { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import { Fade } from '@mui/material';

export default function MainPage() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    document.title = "Baikal-Amikan";
  }, []);
  useEffect(() => {
    // Set isVisible to true after the component has mounted
    setIsVisible(true);
  }, []);
  const { dictionary, language, season } = useSafeContext(BaseContext);
  const [mainPageQuote, setMainPageQuote] = useState<string | null>(null);

  useEffect(() => {
    if (dictionary && language) {
      const found = dictionary.find((item) => item.id === "mainPageQuote");
      if (found) {
        setMainPageQuote(found.text[language]);
      }
    }
  }, [dictionary, language]);

  return (
    <>
      {language && dictionary ? (
        <div className={css.root} style={{ backgroundImage: `url(${season?.cover})` }}>
          <SideMenu />
          <LogoBlock />

          <Container maxWidth="sm">
            <div className={css.centerBlock}>
              {mainPageQuote ? (
                <>
                  <Fade in={isVisible} timeout={2000}>
                    <Typography variant="h1" align="center" dangerouslySetInnerHTML={{ __html: mainPageQuote }} />
                  </Fade>
                  <br />
                  <Fade in={isVisible} timeout={1000}>
                  <Link to={`/${language}/tours/`} className={css.exploreTours}>
                    {dictionary.find((item) => item.id === "exploreTours")?.text[language]}
                  </Link>
                  </Fade>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          </Container>

          <div className={css.footerBlock}>
            <FooterBlock />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
