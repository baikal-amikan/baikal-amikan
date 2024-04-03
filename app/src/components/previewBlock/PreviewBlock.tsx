import css from "./PreviewBlock.module.scss";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface PreviewBlockProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}
export default function PreviewBlock({ title, subtitle, image, link }: PreviewBlockProps) {
  return (
    <Grid item xs={12} md={6}>
      <Link to={link} className={css.preview}>
        <img src={`${image}`} alt={title} />
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Link>
    </Grid>
  );
}
