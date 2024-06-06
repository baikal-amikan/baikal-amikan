import React, { useState } from "react";
import { Drawer, List, ListItem, Typography, Button, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import css from "./SideMenu.module.scss";
import { styled } from "@mui/system";
import { useSafeContext } from "../../config.ts";
import { BaseContext } from "../../contexts/BaseContext.tsx";
import StarIcon from "@mui/icons-material/Star";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import HikingIcon from "@mui/icons-material/Hiking";
import RateReviewIcon from "@mui/icons-material/RateReview";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from "react-router-dom";
import {EmailRounded, FacebookRounded, FindInPageRounded, Instagram, Telegram} from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";

const CustomDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
  },
}));

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { language, dictionary, contacts, setLanguage } = useSafeContext(BaseContext);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div className={css.container}>
      <Button
        variant={"contained"}
        onClick={toggleDrawer(true)}
        className={css.drawerButton}
        aria-label="menu"
        size={"large"}
        sx={{ size: "small" }}
      >
        <MenuIcon />
      </Button>

      <div className={css.langLinks}>
        <Button
          startIcon={<LanguageIcon />}
          onClick={() => {
            setLanguage("ru");
          }}
          disabled={language === "ru"}
        >
          {" "}
          RU{" "}
        </Button>
        <Button
          startIcon={<LanguageIcon />}
          onClick={() => {
            setLanguage("en");
          }}
          disabled={language === "en"}
        >
          {" "}
          EN{" "}
        </Button>
      </div>

      <CustomDrawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {language && dictionary ? (
          <Typography variant="subtitle1" style={{ maxWidth: "300px" }}>
            <List style={{ margin: "50px 20px 50px 50px" }}>
              <ListItem key="tours">
                <Button className={css.drawerLink} startIcon={<StarIcon />}>
                  <Link to={`/${language}/tours`}>
                    {dictionary.find((item) => item.id === "tours")?.text[language]}
                  </Link>
                </Button>
              </ListItem>

              <ListItem key="whereToGo">
                <Button className={css.drawerLink} startIcon={<AirportShuttleIcon />}>
                  <Link to={`/${language}/places`}>
                    {dictionary.find((item) => item.id === "whereToGo")?.text[language]}
                  </Link>
                </Button>
              </ListItem>

              <ListItem key="whatToDo">
                <Button className={css.drawerLink} startIcon={<HikingIcon />}>
                  <Link to={`/${language}/activities`}>
                    {dictionary.find((item) => item.id === "whatToDo")?.text[language]}
                  </Link>
                </Button>
              </ListItem>

              <ListItem key="guestBook">
                <Button className={css.drawerLink} startIcon={<RateReviewIcon />}>
                  <Link to={`/${language}/guest-book`}>
                    {dictionary.find((item) => item.id === "guestBook")?.text[language]}
                  </Link>
                </Button>
              </ListItem>

              <ListItem key="storiesAndArticles">
                <Button className={css.drawerLink} startIcon={<AutoStoriesIcon />}>
                  <Link to={`/${language}/articles`}>
                    {dictionary.find((item) => item.id === "articles")?.text[language]}
                  </Link>
                </Button>
              </ListItem>
              <ListItem key="team">
                <Button className={css.drawerLink} startIcon={<GroupsIcon />}>
                  <Link to={`/${language}/team`}>{dictionary.find((item) => item.id === "team")?.text[language]}</Link>
                </Button>
              </ListItem>
              <ListItem key="faq">
                <Button className={css.drawerLink} startIcon={<QuestionMarkIcon />}>
                  <Link to={`/${language}/faq`}>{dictionary.find((item) => item.id === "faq")?.text[language]}</Link>
                </Button>
              </ListItem>

              {contacts ? (
                <ListItem>
                  <div className={css.contactsBlock}>
                    <Box display="flex" alignItems="center">
                      {contacts.social.facebook ? (
                        <Link to={contacts.social.facebook}>
                          <FacebookRounded />
                        </Link>
                      ) : (
                        ""
                      )}
                      {contacts.social.instagram ? (
                        <Link to={contacts.social.instagram}>
                          <Instagram />
                        </Link>
                      ) : (
                        ""
                      )}
                      {contacts.social.tripadvisor ? (
                        <Link to={contacts.social.tripadvisor}>
                          <FindInPageRounded />
                        </Link>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box display="flex" alignItems="left">
                      <EmailRounded />
                      <Typography variant="caption">
                        <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="left">
                      <WhatsAppIcon />
                      <Typography variant="caption">
                         <Link to={`https://wa.me/${contacts.phone}`}>Whatsapp</Link>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="left">
                      <Telegram />
                      <Typography variant="caption">
                        <Link to={`https://t.me/${contacts.phone}`}>Telegram</Link>
                      </Typography>
                    </Box>
                  </div>
                </ListItem>
              ) : (
                ""
              )}
            </List>
          </Typography>
        ) : (
          ""
        )}
      </CustomDrawer>
    </div>
  );
}
