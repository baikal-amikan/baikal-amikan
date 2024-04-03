import { BaseContext, iArticle } from "../../contexts/BaseContext.tsx";
import { useSafeContext } from "../../config.ts";
import { Avatar, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PicturesBlock from "../picturesBlock/PicturesBlock.tsx";
import css from "./ArticleBlock.module.scss";

interface ArticleBlockProps {
  version: "short" | "full";
  article: iArticle;
}

export default function ArticleBlock({ version, article }: ArticleBlockProps) {
  const { language } = useSafeContext(BaseContext);

  return (
    <>
      {language ? (
        <>
          <div className={css.articlePreviewDiv}>
            {article.description.cover ? (
              <div className={css.articlePreviewAvatar}>
                <Avatar alt={article.title[language]} src={article.description.cover} sx={{ width: 150, height: 150 }} style={{ margin: "25px 15px 5px 5px", float: "left" }} />
              </div>
            ) : (
              ""
            )}
            {article.description ? (
              <div className={css.articlePreviewText}>
                <Typography variant="h4" align="left" style={{ margin: "30px auto 5px auto" }} dangerouslySetInnerHTML={{ __html: article.title[language] }} />
                <Typography variant="body2" align="left" dangerouslySetInnerHTML={{ __html: article.description[language] }} />
                {version === "short" ? (
                  <Link to={`/${language}/articles/${article.id}`} style={{ fontStyle: "italic" }}>
                    {article.linkToFullVersionText[language]}
                  </Link>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          {version === "full" ? (
            <>
              <Divider style={{ margin: "30px auto" }} />
              {article.text ? <Typography variant="body1" align="left" dangerouslySetInnerHTML={{ __html: article.text[language] }} /> : ""}
              {article.pictures ? <PicturesBlock pictures={article.pictures.map((pic) => ({ title: pic.title[language], url: pic.src }))} /> : ""}

              {article.video
                ? article.video.map((video, index) => (
                    <div key={`video-${index}`} className={css.videoPreview}>
                      {video.description ? <Typography variant="body1" align="left" style={{ margin: "0 auto 20px auto" }} dangerouslySetInnerHTML={{ __html: video.description[language] }} /> : ""}
                      <div dangerouslySetInnerHTML={{ __html: video.src }} />
                    </div>
                  ))
                : ""}
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
