import css from "./ArticlePage.module.scss";
import { useParams } from "react-router-dom";
import { BaseContext, iArticle} from "../../contexts/BaseContext.tsx";
import { useSafeContext } from "../../config.ts";
import { Container} from "@mui/material";
import SideMenu from "../../components/sideMenu/SideMenu.tsx";
import LogoBlock from "../../components/logoBlock/LogoBlock.tsx";
import FooterBlock from "../../components/footerBlock/FooterBlock.tsx";
import { useEffect, useState } from "react";
import NavbarBlock from "../../components/narbarBlock/NavbarBlock.tsx";
import ArticleBlock from "../../components/articleBlock/ArticleBlock.tsx";


export default function ArticlePage() {
  const { articleId } = useParams<string>();
  const [article, setArticle] = useState<iArticle | null>(null);
  const {  language, dictionary, allArticles} = useSafeContext(BaseContext);

  useEffect(() => {
    let ignore = false;
    if (!article && articleId && language && allArticles) {
      const found = allArticles.find((item) => item.id === articleId);
      if (found && !ignore) {
        setArticle(found);
        document.title = `${found.title[language]} | Baikal-Amikan`;
      }
    }
    return () => {
      ignore = true;
    };
  }, [article, language, articleId, allArticles]);

  return (
    <div className={css.root}>
      <SideMenu />
      <LogoBlock  />

      {language && dictionary && article ?
        <NavbarBlock links={[
          {"text": dictionary?.find((item) => (item.id === "home"))?.text[language], "href": `/${language}/`},
          {"text": dictionary?.find((item) => (item.id === "articles"))?.text[language], "href": `/${language}/articles/`},
          {"text": article.title[language], "href": `${language}/articles/${article.id}`},
        ]}/>: 'Loading...'}

      {language && dictionary && article ? <Container maxWidth="md" style={{marginTop: "40px"}}>
        <ArticleBlock version={"full"} article={article}/>

      </Container>: 'Loading...'}

      <FooterBlock />
    </div>
  );
}
