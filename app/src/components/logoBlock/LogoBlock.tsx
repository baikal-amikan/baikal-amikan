import css from "./LogoBlock.module.scss";
import { Link } from "react-router-dom";
import { useSafeContext } from "../../config.ts";
import { BaseContext } from "../../contexts/BaseContext.tsx";

export default function LogoBlock() {
  const {language} = useSafeContext(BaseContext);
  return (
    <Link to={`/${language}/`} className={css.logoImage}>
      <img srcSet={"/public/main-images/logo.png"} src={"/public/main-images/logo.png"} alt={"Baikal-Amikan"}/>
    </Link>
  );
}

