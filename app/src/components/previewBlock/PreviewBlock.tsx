import css from "./PreviewBlock.module.scss";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface PreviewBlockProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}
export default function PreviewBlock({ title, subtitle, image, link }: PreviewBlockProps) {
  return (
    <Link to={link} className={css.preview}>
      <img src={`${image}`} alt={title} />
      <div className={css.overlay} >
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </div>
    </Link>
  );
}
