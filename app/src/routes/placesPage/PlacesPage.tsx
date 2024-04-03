import { BaseContext } from "../../contexts/BaseContext.tsx";
import {  useSafeContext } from "../../config.ts";
import { Container, Grid } from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import PreviewBlock from "../../components/previewBlock/PreviewBlock.tsx";

export default function PlacesPage() {
  document.title = "Where To Go | Baikal-Amikan";
  const { language, allPlaces, allSeasons, dictionary} = useSafeContext(BaseContext);

  return (
    <div>
      <SideMenu />
      <LogoBlock />
      {language && dictionary ?
        <NavbarBlock links={[
          {"text": dictionary?.find((item) => (item.id === "home"))?.text[language], "href": `/${language}/`},
          {"text": dictionary?.find((item) => (item.id === "whereToGo"))?.text[language], "href": `/${language}/places/`},
        ]}/>: 'Loading...'}

      {language && dictionary && allPlaces ? <Container  maxWidth="lg" style={{margin: "50px auto 100px"}}>

        <Grid container spacing={2}>
          {language && allPlaces && allSeasons? allPlaces.map((place) => (
            <PreviewBlock
              key={place.id}
              image={place.cover}
              title={place.title[language]}
              subtitle={place.seasons.map((season) => (allSeasons.find((item) => (item.id === season))?.title[language])).join(', ')}
              link={`/${language}/activities/${place.id}`}/>
          )): 'Loading places...'}
        </Grid>
      </Container>: 'Loading...'}

      <FooterBlock />
    </div>
  );
}
