import { BaseContext } from "../../contexts/BaseContext.tsx";
import { useSafeContext } from "../../config.ts";
import { Container, Grid } from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import PreviewBlock from "../../components/previewBlock/PreviewBlock.tsx";
import { useEffect } from "react";

export default function ActivitiesPage() {
  useEffect(() => {
    document.title = "What To Do | Baikal-Amikan";
  }, []);
  const { language, allSeasons, allActivities, dictionary } = useSafeContext(BaseContext);

  return (
    <div>
      <SideMenu />
      <LogoBlock />
      {language && dictionary ? (
        <NavbarBlock
          links={[
            { text: dictionary?.find((item) => item.id === "home")?.text[language], link: `/${language}/` },
            { text: dictionary?.find((item) => item.id === "whatToDo")?.text[language], link: `/${language}/activities/` },
          ]}
        />
      ) : (
        "Loading..."
      )}

      {language && allSeasons && allActivities ? (
        <Container maxWidth="lg" style={{ margin: "50px auto 100px" }}>
          <Grid container spacing={2}>
            {allActivities.map((activity) => (
              <PreviewBlock
                key={activity.id}
                image={activity.cover}
                title={activity.title[language]}
                subtitle={activity.seasons.map((season) => allSeasons.find((item) => item.id === season)?.title[language]).join(", ")}
                link={`/${language}/activities/${activity.id}`}
              />
            ))}
          </Grid>
        </Container>
      ) : (
        "Loading..."
      )}

      <FooterBlock />
    </div>
  );
}
