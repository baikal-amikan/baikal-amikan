import css from "./FormBlock.module.scss";
import { sentEmail, useSafeContext } from "../../config.ts";
import { BaseContext, iTour } from "../../contexts/BaseContext.tsx";
import { Button,  TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

interface iFormData {
  name: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  dateStart: string;
  dateEnd: string;
  groupSize: string;
  kids: string;
  accommodationType: string;
  foodRequest: string;
  text: string;
  tourId: string | null;
}

interface iFormDataErrors {
  [key: string]: string|null;
}

interface FormBlockProps {
  tourId: string | null;
  type: 'tour' | 'review';
}

export default function FormBlock({tourId, type}: FormBlockProps){
  const {allTours, language, dictionary} = useSafeContext(BaseContext);
  const [tour, setTour] = useState<iTour | null>(null);
  const [formData, setFormData] = useState<iFormData| null>(null);
  const [errors, setErrors] = useState<iFormDataErrors>({});

  useEffect(() => {
    if (!tour && tourId && allTours) {
      const tour = allTours.find((tour) => tour.id === tourId);
      if (tour) {setTour(tour);}
    }
  }, [tour, allTours, tourId]);

  useEffect(() => {
    const today = new Date();
    const dateInTwoMonths = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
    const dateInTwoMonthsAndOneWeek = new Date(dateInTwoMonths.getFullYear(), dateInTwoMonths.getMonth(), dateInTwoMonths.getDate() + 7);

    const defaultData = {
      name: "",
      lastName: "",
      email: "",
      dateStart: dateInTwoMonths.toISOString().split("T")[0],
      dateEnd: dateInTwoMonthsAndOneWeek.toISOString().split("T")[0],
      groupSize: "0",
      kids: "0",
      accommodationType: "",
      foodRequest: "",
      phone: "",
      text: "",
      tourId: "",
    }
    if (!formData && tour && type === "tour") {
      defaultData.tourId = tour.id;
      setFormData(defaultData);
    } else if (!formData && type === "review") {
      setFormData(defaultData);
    }
  }, [formData, tour, language, type, dictionary]);

  function fieldHasError(fieldName:string, fieldValue:string|number): string | null {
    let errorMessage = null as string | null;
    if (dictionary && language) {
      if (fieldValue.toString().trim() === "") {
        const notEmptyError = dictionary.find(item => item.id === "notEmptyError")?.text[language];
        errorMessage = notEmptyError ? notEmptyError : "Please, fill the field.";

      } else if (fieldName === "email" && !fieldValue.toString().includes("@")) {
        const emailError = dictionary.find(item => item.id === "emailError")?.text[language];
        errorMessage = emailError ? emailError : "Please, add valid email.";

      } else if ((fieldName === "groupSize" || fieldName === "kids") && (Number(fieldValue || 0)) === 0) {
        const groupSizeError = dictionary.find(item => item.id === "groupSizeError")?.text[language];
        errorMessage = groupSizeError ? groupSizeError : "Please, enter the group size.";
      }
    }
    return errorMessage;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && language && dictionary && tour) {
      if (type === "tour") {
        const updatedErrors = {
          "name": fieldHasError("name", formData.name),
          "email": fieldHasError("email", formData.email),
          "dateStart": fieldHasError("dateStart", formData.dateStart),
          "dateEnd": fieldHasError("dateEnd", formData.dateEnd),
          "groupSize": fieldHasError("groupSize", formData.groupSize),
          "accommodationType": fieldHasError("accommodationType", formData.accommodationType),
        };
        setErrors(updatedErrors);
        if (!updatedErrors.name &&
          !updatedErrors.email &&
          !updatedErrors.dateStart &&
          !updatedErrors.dateEnd &&
          !updatedErrors.groupSize &&
          !updatedErrors.accommodationType
          && !formData.lastName && !formData.phone) {
          sentEmail(
            "Baikal-Amikan: Book a tour",
            `<b>${tour.title[language]}</b><p>
${dictionary.find(item => item.id === 'formEmailPlaceholder')?.text[language]} <b>${formData.email}</b><br/>
${dictionary.find(item => item.id === 'formNamePlaceholder')?.text[language]} <b>${formData.name}</b><br/>
${dictionary.find(item => item.id === 'formDateStartPlaceholder')?.text[language]} <b>${formData.dateStart}</b><br/>
${dictionary.find(item => item.id === 'formDateEndPlaceholder')?.text[language]} <b>${formData.dateEnd}</b><br/>
${dictionary.find(item => item.id === 'formGroupSizePlaceholder')?.text[language]} <b>${formData.groupSize}</b><br/>
${dictionary.find(item => item.id === 'formKidsPlaceholder')?.text[language]} <b>${formData.kids}</b><br/>
${dictionary.find(item => item.id === 'formAccommodationTypeQuestion')?.text[language]} <b>${formData.accommodationType}</b><br/>
${dictionary.find(item => item.id === 'formFoodPreferencesQuestion')?.text[language]} <b>${formData.foodRequest}</b><br/>
${dictionary.find(item => item.id === 'formOtherRequestsQuestion')?.text[language]} <b>${formData.text}</b><p/><p/><p/>`,
            formData.email,
            formData.name).then((result) => {
              console.log(result);
            });
      }
    } else if (type === "review") {
        const updatedErrors = {
          "name": fieldHasError("name", formData.name),
          "email": fieldHasError("email", formData.email),
          "text": fieldHasError("text", formData.text),
        };
        setErrors(updatedErrors);
        if (!updatedErrors.name && !updatedErrors.email && !updatedErrors.text) {
          sentEmail(
            "Baikal-Amikan: New review",
            `<b>New review</b><p>
${dictionary.find(item => item.id === 'formEmailPlaceholder')?.text[language]} <b>${formData.email}</b><br/>
${dictionary.find(item => item.id === 'formNamePlaceholder')?.text[language]} <b>${formData.name}</b><br/>
${dictionary.find(item => item.id === 'formOtherRequestsQuestion')?.text[language]} <b>${formData.text}</b><p/><p/><p/>`,
            formData.email,
            formData.name).then((result) => {
              console.log(result);
            });
        }
      }
    }
  }

  return (
    <div className={css.formBlock}>
      {formData && language && dictionary ?
        <form onSubmit={handleSubmit} className={css.form}>

          <TextField
            style={{ height: "0px", opacity: "0", width: "0px" }}
            fullWidth
            size="small"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />

          <TextField
            style={{ height: "0px", opacity: "0", width: "0px" }}
            fullWidth
            size="small"
            name="phone"
            placeholder="phone"
            value={formData.phone}
            type="tel"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <TextField
            fullWidth
            margin="normal"
            size="small"
            label={dictionary.find(item => item.id === 'formNamePlaceholder')?.text[language]}
            name="name"
            placeholder={dictionary.find(item => item.id === 'formNamePlaceholder')?.text[language]}
            value={formData.name}
            error={!!errors["name"]}
            helperText={errors["name"]}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            fullWidth
            margin="normal"
            size="small"
            label={dictionary.find(item => item.id === 'formEmailPlaceholder')?.text[language]}
            name="email"
            type="email"
            error={!!errors["email"]}
            helperText={errors["email"]}
            placeholder={dictionary.find(item => item.id === 'formEmailPlaceholder')?.text[language]}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {type === 'tour' ?
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "49%" }}
                  className={css.datePicker}
                  label={dictionary.find(item => item.id === 'formDateStartPlaceholder')?.text[language]}
                  name="dateStart"
                  value={dayjs(formData.dateStart)}
                  onChange={(newValue) => newValue? setFormData({ ...formData, dateStart: newValue.toString()}) : ""}
                />
                <DatePicker
                  sx={{ width: "49%" }}
                  className={css.datePicker}
                  label={dictionary.find(item => item.id === 'formDateEndPlaceholder')?.text[language]}
                  name="dateEnd"
                  value={dayjs(formData.dateEnd)}
                  onChange={(newValue) => newValue? setFormData({ ...formData, dateEnd: newValue.toString() }) : ""}
                />
            </LocalizationProvider>: ""}

          {type === 'tour' ? <TextField
            sx={{ width: "49%" }}
            margin="normal"
            size="small"
            label={dictionary.find(item => item.id === 'formGroupSizePlaceholder')?.text[language]}
            name="groupSize"
            type="number"
            error={!!errors["groupSize"]}
            helperText={errors["groupSize"]}
            placeholder={dictionary.find(item => item.id === 'formGroupSizePlaceholder')?.text[language]}
            value={formData.groupSize}
            onChange={(e) => setFormData({ ...formData, groupSize: e.target.value && String(parseInt(e.target.value)) })}
            />: ""}

            {type === 'tour' ? <TextField
              sx={{ width: "49%" }}
              margin="normal"
              size="small"
              name="kids"
              type="number"
              label={dictionary.find(item => item.id === 'formKidsPlaceholder')?.text[language]}
              placeholder={dictionary.find(item => item.id === 'formKidsPlaceholder')?.text[language]}
              value={formData.kids}
              onChange={(e) => setFormData({ ...formData, kids: e.target.value && String(parseInt(e.target.value)) })}
            />: ""}

          {type === 'tour' ?<TextField
              sx={{ width: "49%" }}
              margin="normal"
              size="small"
              name="accommodationType"
              label={dictionary.find(item => item.id === 'formAccommodationTypeQuestion')?.text[language]}
              placeholder={dictionary.find(item => item.id === 'formAccommodationTypePlaceholder')?.text[language]}
              value={formData.accommodationType}
              error={!!errors["accommodationType"]}
              helperText={errors["accommodationType"]}
              onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
            />: ""}


          {type === 'tour' ?<TextField
            sx={{ width: "49%" }}
              margin="normal"
              size="small"
              name="foodRequest"
              label={dictionary.find(item => item.id === 'formFoodPreferencesQuestion')?.text[language]}
              placeholder={dictionary.find(item => item.id === 'formFoodPreferencesPlaceholder')?.text[language]}
              value={formData.foodRequest}
              onChange={(e) => setFormData({ ...formData, foodRequest: e.target.value })}
            />: ""}

          {type === 'tour' ?
            <TextField
              fullWidth
              margin="normal"
              size="small"
              name="text"
              rows={2}
              multiline
              label={dictionary.find(item => item.id === 'formOtherRequestsQuestion')?.text[language]}
              placeholder={dictionary.find(item => item.id === 'formOtherRequestsPlaceholder')?.text[language]}
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />: <TextField
              fullWidth
              margin="normal"
              size="small"
              name="text"
              rows={5}
              multiline
              label={dictionary.find(item => item.id === 'formReviewTextFormPlaceholder')?.text[language]}
              placeholder={dictionary.find(item => item.id === 'formReviewTextFormPlaceholder')?.text[language]}
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />}

          <Button type="submit" variant="contained" color="primary" style={{ marginTop: "40px", marginLeft: "auto" }}>
            {type === 'tour' ?
              dictionary.find(item => item.id === 'bookTour')?.text[language] :
              dictionary.find(item => item.id === 'sendReview')?.text[language]}
          </Button>
        </form> : "Loading..."}
    </div>
  );
}