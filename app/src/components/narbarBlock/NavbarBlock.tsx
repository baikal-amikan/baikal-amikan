import css from "./NavbarBlock.module.scss";
import { Container } from "@mui/material";


interface iNavbarBlock {
  links: {text: string|undefined, href: string}[];
}

export default function NavbarBlock({links}: iNavbarBlock) {
  return (
    <div className={css.navbarBlock}>
      <Container style={{maxWidth: '90%'}}>
        {links.map((link, index) => (
          <span key={link.href}>
            <a href={link.href}>{link.text}</a>
            {index < links.length - 1 ? '/' : ''}
          </span>
        ))}
      </Container>
    </div>
  );
}

