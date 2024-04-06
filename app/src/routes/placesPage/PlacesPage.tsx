import { BaseContext } from "../../contexts/BaseContext.tsx";
import { useSafeContext } from "../../config.ts";
import { Container } from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import PreviewBlock from "../../components/previewBlock/PreviewBlock.tsx";
import { useEffect } from "react";
import FadeInBlocks from "../../components/fadeInBlocks/FadeInBlocks.tsx";

export default function PlacesPage() {
  useEffect(() => {
    document.title = "Where To Go | Baikal-Amikan";
  }, []);
  const { language, allPlaces, allSeasons, dictionary } = useSafeContext(BaseContext);

  return (
    <div>
      <SideMenu />
      <LogoBlock />
      {language && dictionary ? (
        <NavbarBlock
          links={[
            { text: dictionary?.find((item) => item.id === "home")?.text[language], link: `/${language}/` },
            { text: dictionary?.find((item) => item.id === "whereToGo")?.text[language], link: `/${language}/places/` },
          ]}
        />
      ) : (
        "Loading..."
      )}

      {language && dictionary && allPlaces && allSeasons ? (
        <Container maxWidth="lg" style={{ margin: "50px auto 100px" }}>
          <FadeInBlocks
            blocks={
              allPlaces.map((place) => (
                <PreviewBlock
                  key={place.id}
                  image={place.cover}
                  title={place.title[language]}
                  subtitle={place.seasons
                    .map((season) => allSeasons.find((item) => item.id === season)?.title[language])
                    .join(", ")}
                  link={`/${language}/places/${place.id}`}
                />))
            }/>
        </Container>
      ) : (
        "Loading..."
      )}

      <FooterBlock />
    </div>
  );
}
