import css from "./LogoBlock.module.scss";
import { Link } from "react-router-dom";
import {FILES_PATH, useSafeContext} from "../../config.ts";
import {BaseContext} from "../../contexts/BaseContext.tsx";

interface LogoBlockProps {
  position?: "center" | "left";
}

export default function LogoBlock({ position }: LogoBlockProps) {
  const { language } = useSafeContext(BaseContext);
  const cssClass = position ? css[position] : css.left;
  return (
    <Link to={`/${language}/`} className={`${css.logoImage} ${cssClass}`}>
      <img srcSet={`${FILES_PATH}/logo.png`} src={`${FILES_PATH}/logo.png`} alt={"Baikal-Amikan"} />
    </Link>
  );
}
