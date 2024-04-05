import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import { useState } from "react";
import css from "./PicturesBlock.module.scss";
import theme from "../../theme.ts";
import SlideShowBlock from "../slideShowBlock/SlideShowBlock.tsx";

interface PicturesBlockProps {
  variant?: "woven" | "standard" | "masonry" | "quilted";
  pictures: Array<{
    title: string;
    url: string;
  }>;
}

export default function PicturesBlock({ pictures, variant }: PicturesBlockProps) {
  const [open, setOpen] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const ImageListVariant = variant ? variant : "woven";
  return (
    <>
      <ImageList
        sx={{ width: "100%", margin: "10px auto 30px" }}
        variant={isSmallScreen ? "standard" : ImageListVariant}
        cols={isSmallScreen ? 2 : 3}
        gap={isSmallScreen ? 6 : 8}
      >
        {pictures.map((item, index) => (
          <a
            href={`#image-${index}`}
            className={css.link}
            onClickCapture={() => setOpen(true)}
            key={`image-list-item-${item.url}`}
          >
            <ImageListItem>
              <img
                srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.url}?w=161&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                className={css.image}
                // onClick={() => {
                //   // setCurrentIndex(index);
                //   setOpen(true);
                // }}
              />
            </ImageListItem>
          </a>
        ))}
      </ImageList>
      <SlideShowBlock
        pictures={pictures}
        open={open}
        // currentPic={currentIndex}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
