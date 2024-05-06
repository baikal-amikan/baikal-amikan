// import { useState, useEffect, useRef } from "react";
import { Modal, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import css from "./SlideShowBlock.module.scss";

interface SlideShowProps {
  open: boolean;
  onClose: () => void;
  pictures: Array<{
    title: string | null;
    url: string;
  }>;
}

export default function SlideShowBlock({ pictures, open, onClose }: SlideShowProps) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div className={css.verticalSlideshowContainer} onClick={onClose}>
        <Button onClick={onClose} className={css.closeButton} variant={"contained"}>
          <Close />
        </Button>
        {pictures.map((item, index) => (
          <div key={`image-${index}`} id={`image-${index}`} className={css.slide}>
            <div className={css.slideContent}>
              <img alt={item.title ? item.title : 'image'} src={item.url} className={css.slideImg} />
              <div className={css.slideText}>{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
