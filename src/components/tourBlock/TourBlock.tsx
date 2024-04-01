import css from "./TourBlock.module.scss";
import { BaseContext, iTour } from "../../contexts/BaseContext.tsx";
import { Card, CardContent, CardMedia, Divider, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSafeContext } from "../../config.ts";



interface TourBlockProps {
  tour: iTour,
  language: 'en' | 'ru'
}

export default function TourBlock({tour, language}: TourBlockProps) {
  const {allPlaces, allActivities, season} = useSafeContext(BaseContext);

  return (
    <Grid item xs={6} key={`seasons-tab-${tour.id}`}>
      <Paper elevation={3} key={`tour-${tour.id}`} style={{margin: "20px 20px 0"}}>
        <Card>
          <Link to={`/${language}/tours/${tour.id}`} >
            {season?<CardMedia
              sx={{ height: 240 }}
              itemProp="image"
              image={tour.covers? tour.covers[season?.id]: tour.cover}
              title={tour.title[language]}
            />: ''}
          </Link>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Link to={`/${language}/tours/${tour.id}`} className={css.title}>{tour.title[language]}</Link>
            </Typography>
            <Typography style={{marginBottom: "10px"}}  color="text.secondary">
              {tour.months[language]} (<span>{tour.duration[language]} </span>)
            </Typography>
            <Typography variant="body2" color="text.primary" paragraph>
              {tour.shortDescription[language]}
            </Typography>

            <Divider style={{marginBottom: "20px"}} />

            <Typography variant="caption" align="left" paragraph style={{ marginBottom: "5px", lineHeight: "1.8rem" }}>
              {tour.activities?.map((id) => {
                const activity = allActivities?.find((item) => (item.id === id));
                return <Link key={`activity-${id}`} to={`/${language}/activities/${activity?.id}`}
                             className={css.activityLabel}>
                  {activity?.title[language]}
                </Link>;
              })}
            </Typography>

            <Typography variant="caption" align="left" paragraph style={{ lineHeight: "1.8rem" }}>
              {tour.places?.map((id) => {
                const place = allPlaces?.find((item) => (item.id === id));
                return <Link key={`place-${id}`} to={`/${language}/places/${place?.id}`} className={css.placeLabel}>
                  {place?.title[language]}
                </Link>;
              })}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
}

