import css from "./LogoBlock.module.scss";
import { Link } from "react-router-dom";
import {FILES_PATH, useSafeContext} from "../../config.ts";
import { BaseContext } from "../../contexts/BaseContext.tsx";

export default function LogoBlock() {
  const { language } = useSafeContext(BaseContext);
  return (
    <Link to={`/${language}/`} className={css.logoImage}>
      <img srcSet={`${FILES_PATH}/logo.png`} src={`${FILES_PATH}/logo.png`} alt={"Baikal-Amikan"} />
    </Link>
  );
}
