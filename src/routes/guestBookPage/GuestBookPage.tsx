import { Container } from "@mui/material";
import { useSafeContext } from "../../config.ts";
import { BaseContext } from "../../contexts/BaseContext.tsx";
import css from "./GuestBookPage.module.scss";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import ReviewBlock from "../../components/reviewBlock/ReviewBlock.tsx";

export default function GuestBookPage() {
  const {
    language,
    dictionary,
    allReviews
  } = useSafeContext(BaseContext);

  return (
    <div className={css.container}>
      <SideMenu />
      <LogoBlock />
      {language && dictionary ?
        <NavbarBlock links={[
          {"text": dictionary?.find((item) => (item.id === "home"))?.text[language], "href": `/${language}/`},
          {text: dictionary?.find((item) => (item.id === "guestBook"))?.text[language], href: `/${language}/guest-book`},
        ]}/>: 'Loading...'}


      {allReviews && language && dictionary ?
        <Container maxWidth="md" style={{marginBottom: "100px"}}>
          {allReviews.map((review, index) => (
            <ReviewBlock review={review} key={`review-${index}`} />))}

        </Container>
        :
        <div>Loading...</div>
      }
      <FooterBlock />
    </div>
  );
}
