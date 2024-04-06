import css from "./TourBlock.module.scss";
import { BaseContext, iTour } from "../../contexts/BaseContext.tsx";
import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSafeContext } from "../../config.ts";

interface TourBlockProps {
  tour: iTour;
  language: "en" | "ru";
}

export default function TourBlock({ tour, language }: TourBlockProps) {
  const { allPlaces, allActivities, season } = useSafeContext(BaseContext);
  return (
    <Paper elevation={1} key={`tour-${tour.id}`} className={css.tourPaperBlock}>
      <Card>
        <Link to={`/${language}/tours/${tour.id}`} className={css.tourLink}>
          {season ? (
            <CardMedia
              sx={{height: 240}}
              itemProp="image"
              image={tour.covers ? tour.covers[season?.id] : tour.cover}
              title={tour.title[language]}
              className={css.cardMedia}
            />
          ) : (
            ""
          )}
        </Link>
        <CardContent className={css.cardContent}>
          <Link to={`/${language}/tours/${tour.id}`} className={css.tourLink}>
            <Typography gutterBottom variant="h5" component="h4" style={{marginBottom: "4px"}}>
              {tour.title[language]}
            </Typography>
            <Typography variant="body2" style={{marginBottom: "10px"}} color="text.secondary">
              {tour.months[language]} (<span>{tour.duration[language]} </span>)
            </Typography>
            <Typography variant="body2" style={{marginBottom: "20px"}} color="text.primary" paragraph>
              {tour.shortDescription[language]}
            </Typography>
          </Link>
          <Typography variant="caption" align="left" component="div">
            {tour.activities?.map((id) => {
              const activity = allActivities?.find((item) => item.id === id);
              return (
                <Link
                  key={`activity-${id}`}
                  to={`/${language}/activities/${activity?.id}`}
                  className={css.activityLabel}
                >
                  {activity?.title[language]}
                </Link>
              );
            })}
          </Typography>

          <Typography variant="caption" align="left" component="div">
            {tour.places?.map((id) => {
              const place = allPlaces?.find((item) => item.id === id);
              return (
                <Link key={`place-${id}`} to={`/${language}/places/${place?.id}`} className={css.placeLabel}>
                  {place?.title[language]}
                </Link>
              );
            })}
          </Typography>
        </CardContent>
      </Card>
    </Paper>

  );
}
