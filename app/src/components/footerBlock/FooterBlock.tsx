import css from "./FooterBlock.module.scss";

export default function FooterBlock() {
  const thisYear = new Date().getFullYear();
  return <div className={css.footer}>© Baikal-Amikan, 2011-{thisYear}</div>;
}
