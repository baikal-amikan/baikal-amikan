import css from "./ActivityPage.module.scss";
import { useParams } from "react-router-dom";
import { BaseContext, iActivity, iPlace } from "../../contexts/BaseContext.tsx";
import { getData, useSafeContext } from "../../config.ts";
import { Typography, Container, Grid, Divider } from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import { useEffect, useState } from "react";
import PicturesBlock from "../../components/picturesBlock/PicturesBlock.tsx";
import TourBlock from "../../components/tourBlock/TourBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";


export default function ActivityPage() {
  const { activityId } = useParams<string>();
  const [activity, setActivity] = useState<iActivity | null>(null);
  const { language, allActivities, dictionary, allTours} = useSafeContext(BaseContext);

  useEffect(() => {
    let ignore = false;
    if (!activity && activityId && language) {
      if (allActivities) {
        const found = allActivities.find((item) => item.id === activityId);
        if (found) {
          setActivity(found);
          document.title = `${found.title[language]} | Baikal-Amikan`;
        }
      } else {
        getData(`/public/activities/${activityId}/data.json`).then((result: iPlace) => {
          if (!ignore) {
            setActivity(result);
            document.title = `${result.title[language]} | Baikal-Amikan`;
          }
        });
      }
    }
    return () => {
      ignore = true;
    };
  }, [activity, language, activityId, allActivities]);

  useEffect(() => {
    let ignore = false;
    if (allActivities && allTours && activity && !activity.pictures) {
      const updatedActivity = {...activity} as iActivity;
      updatedActivity.pictures = [];
      for (const tour of allTours) {
        if (tour.activities && tour.activities.includes(updatedActivity.id)) {
          for (const day of tour.days) {
            updatedActivity.pictures.push(...day.pictures.filter(picture => picture.activities?.includes(updatedActivity.id)));
          }
        }
      }
      if (!ignore) {
        setActivity(updatedActivity);
      }
    }
    return () => {
      ignore = true;
    };
  }, [activity, allActivities, allTours]);


  return (
    <div className={css.root}>
      <SideMenu />
      <LogoBlock  />

      {language && dictionary && activity ?
        <NavbarBlock links={[
          {"text": dictionary?.find((item) => (item.id === "home"))?.text[language], "href": `/${language}/`},
          {"text": dictionary?.find((item) => (item.id === "whatToDo"))?.text[language], "href": `/${language}/activities/`},
          {"text": activity.title[language], "href": `${language}/activities/${activity.id}`},
        ]}/>: 'Loading...'}

      {language && dictionary && activity ? <Container maxWidth="md" style={{marginTop: "40px"}}>

        <Typography variant="h4" style={{marginBottom: "20px"}}>
          {activity.title[language]}
        </Typography>

        {activity.pictures?
          <PicturesBlock pictures={
            activity.pictures.map((pic) => ({ title: pic.title[language], url: pic.src }))
          } />: 'Loading...'}

        {activity.description?
          <Typography style={{marginTop: "20px"}} variant="body1" align="left" paragraph>
            {activity.description[language]}
          </Typography>: ''}

        <Divider style={{marginTop: "40px"}}/>
        <Typography style={{marginTop: "20px"}} variant="h5" align="left" paragraph>
          {dictionary.find(item => item.id === 'tours')?.text[language]}
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{marginBottom: "50px"}}>
          {allTours?.filter((tour) => (tour.activities?.includes(activity.id))).map((tour) => (
              <TourBlock tour={tour} language={language} key={`tour-${tour.id}`} />
            )
          )}
        </Grid>

      </Container>: 'Loading...'}

      <FooterBlock />
    </div>
  );
}
