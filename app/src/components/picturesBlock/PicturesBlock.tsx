import { Box, Card, CardContent, CardMedia, ImageList, ImageListItem, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import css from "./PicturesBlock.module.scss";

interface PicturesBlockProps {
  variant?: "woven" | "standard" | "masonry" | "quilted";
  pictures: Array<{
    title: string;
    url: string;
  }>;
}

export default function PicturesBlock({ pictures, variant }: PicturesBlockProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ImageList sx={{ width: "100%", margin: "10px auto 30px" }} variant={variant ? variant : "woven"} cols={3} gap={8} onClick={handleOpen}>
        {pictures.map((item) => (
          <ImageListItem key={`image-list-item-${item.url}`}>
            <img srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`} src={`${item.url}?w=161&fit=crop&auto=format`} alt={item.title} loading="lazy" className={css.image} />
          </ImageListItem>
        ))}
      </ImageList>
      <Modal open={open} onClose={handleClose} onClick={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ maxHeight: "100%", overflow: "auto" }}>
          {pictures.map((item) => (
            <Card sx={{ maxWidth: "90%", margin: "10px auto 30px" }} key={`image-${item.url}`}>
              <Paper elevation={3}>
                <CardMedia component="img" alt={item.title} image={item.url} />
                <CardContent>
                  <Typography variant="body2" color="text.primary">
                    {item.title}
                  </Typography>
                </CardContent>
              </Paper>
            </Card>
          ))}
        </Box>
      </Modal>
    </>
  );
}
