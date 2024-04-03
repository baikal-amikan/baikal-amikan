import { Container, Typography } from "@mui/material";
import { getData, useSafeContext } from "../../config.ts";
import { BaseContext } from "../../contexts/BaseContext.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import { useEffect, useState } from "react";

interface iFAQ {
  question: { en: string; ru: string };
  response: { en: string; ru: string };
}

export default function FAQPage() {
  useEffect(() => {
    document.title = "FAQ | Baikal-Amikan";
  }, []);
  const { language, dictionary } = useSafeContext(BaseContext);
  const [FAQ, setFAQ] = useState<Array<iFAQ> | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!FAQ) {
      getData(`/public/faq.json`).then((team: Array<iFAQ>) => {
        if (!ignore) {
          setFAQ(team);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [FAQ]);

  return (
    <div>
      <SideMenu />
      <LogoBlock />
      {language && dictionary ? (
        <NavbarBlock
          links={[
            { text: dictionary?.find((item) => item.id === "home")?.text[language], link: `/${language}/` },
            { text: dictionary?.find((item) => item.id === "faq")?.text[language], link: `/${language}/faq` },
          ]}
        />
      ) : (
        "Loading..."
      )}

      {FAQ && language && dictionary ? (
        <Container maxWidth="lg" style={{ marginBottom: "100px" }}>
          {FAQ.map((question, index) => (
            <div key={`question-${index}`} style={{ marginTop: "30px" }}>
              <Typography variant="h3" align="left" style={{ margin: "20px auto 0px auto" }} dangerouslySetInnerHTML={{ __html: question.question[language] }} />
              <Typography variant="body1" align="left" style={{ margin: "5px auto 5px auto" }} dangerouslySetInnerHTML={{ __html: question.response[language] }} />
            </div>
          ))}
        </Container>
      ) : (
        <div>Loading...</div>
      )}

      <FooterBlock />
    </div>
  );
}
