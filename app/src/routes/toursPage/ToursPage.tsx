import * as React from "react";
import css from "./ToursPage.module.scss";
import { useParams } from "react-router-dom";
import { BaseContext, iTour } from "../../contexts/BaseContext.tsx";
import { useSafeContext } from "../../config.ts";
import { Container, Box, Tabs, Tab} from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import { useEffect, useState } from "react";
import TourBlock from "../../components/tourBlock/TourBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import FadeInBlocks from "../../components/fadeInBlocks/FadeInBlocks.tsx";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`seasons-tabpanel-${index}`}
      aria-labelledby={`seasons-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}> {children} </Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `seasons-tab-${index}`,
    "aria-controls": `seasons-tabpanel-${index}`,
  };
}

export default function ToursPage() {
  useEffect(() => {
    document.title = "Tours | Baikal-Amikan";
  }, []);
  const { allTours, dictionary, allSeasons, language, setLanguage } = useSafeContext(BaseContext);
  const [value, setValue] = React.useState(0);
  const [seasonsWithTours, setSeasonsWithTours] = useState<{ [key: string]: Array<iTour> } | null>(null);
  const { lang } = useParams<{ lang: "en" | "ru" }>();

  useEffect(() => {
    if (!lang && language) {
      window.location.href = `/${language}`;
    } else if (lang && language !== lang) {
      setLanguage(lang);
    }
  }, [language, lang, setLanguage]);

  useEffect(() => {
    if (!seasonsWithTours && allSeasons && allTours) {
      const result = {
        summer: [] as Array<iTour>,
        winter: [] as Array<iTour>,
      };
      for (const tour of allTours) {
        if (tour.season == "summer") {
          result.summer.push(tour);
        } else if (tour.season == "winter") {
          result.winter.push(tour);
        } else {
          result.summer.push(tour);
          result.winter.push(tour);
        }
      }
      setSeasonsWithTours(result);
    }
  }, [allTours, allSeasons, seasonsWithTours]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <div className={css.root}>
      <SideMenu />
      <LogoBlock />

      {language && dictionary ? (
        <NavbarBlock
          links={[
            { text: dictionary?.find((item) => item.id === "home")?.text[language], link: `/${language}/` },
            { text: dictionary?.find((item) => item.id === "tours")?.text[language], link: `/${language}/tours/` },
          ]}
        />
      ) : (
        "Loading..."
      )}

      <Container className={css.container}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className={css.tourTabs}>
          <Tabs value={value} onChange={handleChange} aria-label="seasons" style={{ textAlign: "center" }}>
            {allSeasons && language
              ? allSeasons.map((season, index) => (
                  <Tab
                    className={css.tabLabel}
                    key={`seasons-tabpanel-${index}`}
                    label={season.title[language]}
                    {...a11yProps(index)}
                  />
                ))
              : "Loading seasons..."}
          </Tabs>
        </Box>

        {allSeasons && language && seasonsWithTours
          ? allSeasons.map((season, index) => (
              <CustomTabPanel value={value} index={index} key={`seasons-tab-${index}`}>
                <FadeInBlocks
                  blocks={seasonsWithTours[season.id].map((tour) => (
                      <TourBlock tour={tour} language={language} key={`tour-${tour.id}`} />
                    ))}
                />
              </CustomTabPanel>
            ))
          : "Loading seasons..."}
      </Container>

      <FooterBlock />
    </div>
  );
}
