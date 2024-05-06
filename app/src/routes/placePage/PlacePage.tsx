import css from "./PlacePage.module.scss";
import { useParams } from "react-router-dom";
import { BaseContext, iPlace } from "../../contexts/BaseContext.tsx";
import {FILES_PATH, getData, useSafeContext} from "../../config.ts";
import { Typography, Container, Grid, Divider } from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import { useEffect, useState } from "react";
import PicturesBlock from "../../components/picturesBlock/PicturesBlock.tsx";
import TourBlock from "../../components/tourBlock/TourBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";

export default function PlacePage() {
  const { placeId } = useParams<string>();
  const [place, setPlace] = useState<iPlace | null>(null);
  const { language, allPlaces, dictionary, allTours } = useSafeContext(BaseContext);

  useEffect(() => {
    let ignore = false;
    if (!place && placeId && language) {
      if (allPlaces) {
        const found = allPlaces.find((item) => item.id === placeId);
        if (found) {
          setPlace(found);
          document.title = `${found.title[language]} | Baikal-Amikan`;
        }
      } else {
        getData(`${FILES_PATH}/places/${placeId}/data.json`).then((result: iPlace) => {
          if (!ignore) {
            setPlace(result);
            document.title = `${result.title[language]} | Baikal-Amikan`;
          }
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, [placeId, language, place, allPlaces]);

  useEffect(() => {
    let ignore = false;
    if (allPlaces && allTours && place && !place.pictures) {
      const updatedPlace = { ...place } as iPlace;
      updatedPlace.pictures = [];
      for (const tour of allTours) {
        if (tour.places && tour.places.includes(updatedPlace.id)) {
          for (const day of tour.days) {
            updatedPlace.pictures.push(...day.pictures.filter((picture) => picture.places?.includes(updatedPlace.id)));
          }
        }
      }
      if (!ignore) {
        setPlace(updatedPlace);
      }
    }
    return () => {
      ignore = true;
    };
  }, [place, allPlaces, allTours]);

  return (
    <div className={css.root}>
      <SideMenu />
      <LogoBlock />

      {language && dictionary && place ? (
        <NavbarBlock
          links={[
            { text: dictionary?.find((item) => item.id === "home")?.text[language], link: `/${language}/` },
            { text: dictionary?.find((item) => item.id === "whereToGo")?.text[language], link: `/${language}/places/` },
            { text: place.title[language], link: `/${language}/places/${place.id}` },
          ]}
        />
      ) : (
        "Loading..."
      )}

      {language && dictionary && place ? (
        <Container maxWidth="md" style={{ marginTop: "40px" }}>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            {place.title[language]}
          </Typography>

          {place.pictures ? (
            <PicturesBlock pictures={place.pictures.map((pic) => ({ title: pic.title[language], url: `${FILES_PATH}/${pic.src}` }))} />
          ) : (
            "Loading..."
          )}

          <Typography style={{ marginTop: "20px" }} variant="body1" align="left" paragraph>
            {place.description[language]}
          </Typography>

          <Divider style={{ marginTop: "40px" }} />
          <Typography style={{ marginTop: "20px" }} variant="h5" align="left" paragraph>
            {dictionary.find((item) => item.id === "tours")?.text[language]}
          </Typography>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginBottom: "50px" }}>
            {allTours
              ?.filter((tour) => tour.places?.includes(place.id))
              .map((tour) => <TourBlock tour={tour} language={language} key={`tour-${tour.id}`} />)}
          </Grid>
        </Container>
      ) : (
        "Loading..."
      )}
      <FooterBlock />
    </div>
  );
}
