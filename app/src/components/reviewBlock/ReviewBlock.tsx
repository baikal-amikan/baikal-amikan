import { BaseContext, iReview, iTour } from "../../contexts/BaseContext.tsx";
import { useSafeContext } from "../../config.ts";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./ReviewBlock.module.scss";

interface ReviewBlockProps {
  review: iReview;
}

export default function ReviewBlock({ review }: ReviewBlockProps) {
  const { language, allTours } = useSafeContext(BaseContext);
  const [tour, setTour] = useState<iTour | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!tour && review.tourId && language && allTours) {
      const found = allTours.find((item) => item.id === review.tourId);
      if (found && !ignore) {
        setTour(found);
      }
    }
    return () => {
      ignore = true;
    };
  }, [allTours, language, tour, review.tourId]);

  return (
    <div className={css.reviewDiv} style={{ marginTop: "30px" }}>
      {review.avatar ? (
        <div className={css.avatarDiv}>
          <Avatar
            alt="Svetlana"
            src={review.avatar}
            sx={{ width: 150, height: 150 }}
            style={{ margin: "25px 15px 5px 5px", float: "left" }}
          />
        </div>
      ) : (
        ""
      )}
      <div className={css.reviewTextDiv}>
        <Typography
          variant="h3"
          align="left"
          style={{ margin: "20px auto 0px auto" }}
          dangerouslySetInnerHTML={{ __html: review.name }}
        />
        <Typography variant="subtitle2" align="left" style={{ margin: "0px auto 5px auto" }}>
          {review.date} {review.country ? `(${review.country})` : ""}
        </Typography>
        {review.tourId && language && tour ? (
          <Typography variant="caption" align="left" style={{ margin: "5px auto 5px auto" }}>
            <Link to={`/${language}/tours/${review.tourId}`} style={{ fontStyle: "italic" }}>
              {tour.title[language]}
            </Link>
          </Typography>
        ) : (
          ""
        )}
        {review.text ? (
          <Typography
            variant="body2"
            align="left"
            style={{ margin: "5px auto 5px auto" }}
            dangerouslySetInnerHTML={{ __html: review.text }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
