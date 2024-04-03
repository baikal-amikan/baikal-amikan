import css from "./SendEmailBlock.module.scss";
import { useSafeContext } from "../../config.ts";
import { BaseContext, iTour } from "../../contexts/BaseContext.tsx";
import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface SendEmailBlockProps {
  tourId: string | null;
  type: 'tour' | 'review' | 'question';
}

export default function SendEmailBlock({tourId, type}: SendEmailBlockProps){
  const defaultEmptyString = ``;
  const {allTours, language, dictionary} = useSafeContext(BaseContext);
  const [tour, setTour] = useState<iTour | null>(null);
  const [initialBody, setInitialBody] = useState<string | null>(null);
  const [subject, setSubject] = useState<string>(defaultEmptyString);
  const [body, setBody] = useState<string>(defaultEmptyString);
  const [explainWhatToDo, setExplainWhatToDo] = useState<string>(defaultEmptyString);

  useEffect(() => {
    let newSubject;
    let newExplainWhatToDo;
    if (dictionary && language) {
      if (type === 'tour') {
        newSubject = dictionary.find(item => item.id === 'tourEmailBodySubject')?.text[language];
        newExplainWhatToDo = dictionary.find(item => item.id === 'tourEmailExplainWhatToDo')?.text[language];
      } else if (type === 'review') {
        newSubject = dictionary.find(item => item.id === 'reviewEmailBodySubject')?.text[language];
        newExplainWhatToDo = dictionary.find(item => item.id === 'reviewEmailExplainWhatToDo')?.text[language];
      } else if (type === 'question') {
        newSubject = dictionary.find(item => item.id === 'questionEmailBodySubject')?.text[language];
        newExplainWhatToDo = dictionary.find(item => item.id === 'questionEmailExplainWhatToDo')?.text[language];
      }
      if (newSubject && newExplainWhatToDo) {
        setSubject(newSubject);
        setExplainWhatToDo(newExplainWhatToDo);
      }
    }

  }, [type, dictionary, language]);

  useEffect(() => {
    if (type && language && dictionary && !initialBody) {
      let newBody;
      if (type === 'tour' && tour) {
        newBody = `${dictionary.find(item => item.id === 'tour')?.text[language]} "${tour.title[language]}"\n\n`;
        newBody += dictionary.find(item => item.id === 'tourEmailBody')?.text[language];
      } else if (type === 'review') {
        newBody = dictionary.find(item => item.id === 'reviewEmailBody')?.text[language];
      } else if (type === 'question') {
        newBody = dictionary.find(item => item.id === 'questionEmailBody')?.text[language];
      }
      if (newBody) {
        setInitialBody(newBody);
        setBody(newBody);
      }
    }
  }, [initialBody, type, dictionary, language, tour]);

  useEffect(() => {
    if (tourId && allTours && !tour) {
      const tour = allTours.find((tour) => tour.id === tourId);
      if (tour) {setTour(tour);}
    }
  }, [tour, allTours, tourId]);

  return (
    <div className={css.sendEmailBlock}>
      {language && dictionary && initialBody ?
        <div>
          <Typography variant={"body1"} style={{ margin: "20px auto" }}>Email to: <b>baikalamikan@gmail.com</b><br/>Email Subject: <b>"{subject}"</b></Typography>

          <TextField
            fullWidth
            rows={10}
            size="small"
            multiline
            name="body"
            placeholder={initialBody}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Typography variant={"caption"} style={{ margin: "20px auto 0", display: "block" }}>{explainWhatToDo}</Typography>
          <Link className={css.sendEmailLink}  to={`mailto:baikalamikan@com?subject=${subject}&body=${body.replace(/\n/g, '%0D%0A')}&Content-Type=text/html`}>
            {dictionary.find(item => item.id === 'sendEmail')?.text[language]}
          </Link>

        </div>
      : "Loading..."}
    </div>
  );
}