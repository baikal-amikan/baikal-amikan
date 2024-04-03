import { Avatar, Container, Typography } from "@mui/material";
import { getData, useSafeContext } from "../../config.ts";
import { BaseContext } from "../../contexts/BaseContext.tsx";
import css from "./TeamPage.module.scss";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import { useEffect, useState } from "react";

interface iMember {
  name: { en: string; ru: string };
  text: { en: string; ru: string };
  avatar: string;
}

export default function TeamPage() {
  useEffect(() => {
    document.title = "Team | Baikal-Amikan";
  }, []);
  const { language, dictionary } = useSafeContext(BaseContext);
  const [team, setTeam] = useState<Array<iMember> | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!team) {
      getData(`/public/team/data.json`).then((team: Array<iMember>) => {
        if (!ignore) {
          setTeam(team);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [team]);

  return (
    <div className={css.container}>
      <SideMenu />
      <LogoBlock />
      {language && dictionary ? (
        <NavbarBlock
          links={[
            { text: dictionary?.find((item) => item.id === "home")?.text[language], link: `/${language}/` },
            { text: dictionary?.find((item) => item.id === "team")?.text[language], link: `/${language}/team` },
          ]}
        />
      ) : (
        "Loading..."
      )}

      {team && language && dictionary ? (
        <Container maxWidth="lg" style={{ marginBottom: "100px" }}>
          {team.map((member, index) => (
            <div key={`member-${index}`} className={css.memberDiv} style={{ marginTop: "30px" }}>
              {member.avatar ? (
                <div className={css.avatarDiv}>
                  <Avatar alt={member.name[language]} src={member.avatar} sx={{ width: 150, height: 150 }} style={{ margin: "25px 15px 5px 5px", float: "left" }} />
                </div>
              ) : (
                ""
              )}
              <div className={css.memberTextDiv}>
                <Typography variant="h3" align="left" style={{ margin: "20px auto 0px auto" }} dangerouslySetInnerHTML={{ __html: member.name[language] }} />
                {member.text ? <Typography variant="body2" align="left" style={{ margin: "5px auto 5px auto" }} dangerouslySetInnerHTML={{ __html: member.text[language] }} /> : ""}
              </div>
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
