import css from "./NavbarBlock.module.scss";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

interface iNavbarBlock {
  links: { text: string | undefined; link: string }[];
}

export default function NavbarBlock({ links }: iNavbarBlock) {
  return (
    <div className={css.navbarBlock}>
      <Container style={{ maxWidth: "90%" }}>
        {links.map((link, index) => (
          <span key={link.link}>
            <Link to={link.link}>{link.text}</Link>
            {index < links.length - 1 ? "/" : ""}
          </span>
        ))}
      </Container>
    </div>
  );
}
