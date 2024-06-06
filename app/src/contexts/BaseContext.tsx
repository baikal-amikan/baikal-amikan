import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { getData } from "../config.ts";
import { useLocation, useNavigate } from "react-router-dom";

export interface iPicture {
  title: { en: string; ru: string };
  src: string;
  season: "summer" | "winter" | "all";
  activities: Array<string>;
  places: Array<string>;
}

export interface iTour {
  id: string;
  title: { en: string; ru: string };
  media?: {
    video?: {src: string, description: { en: string; ru: string }},
    pictures?: Array<iPicture>;
  }
  cover: string;
  covers?: { [key: string]: string };
  duration: { en: string; ru: string };
  activities: Array<string>;
  places: Array<string>;
  season: "summer" | "winter" | "all";
  months: { en: string; ru: string };
  shortDescription: { en: string; ru: string };
  description: { en: string; ru: string };
  price: Array<{ en: string; ru: string; price: string }>;
  note: { en: string; ru: string };
  includes: Array<{ en: string; ru: string }>;
  notIncludes: Array<{ en: string; ru: string }>;
  days: Array<{
    order: number;
    title: { en: string; ru: string };
    description: { en: string; ru: string };
    pictures: Array<iPicture>;
  }>;
}

export interface iSeason {
  id: string;
  cover: string;
  title: { en: string; ru: string };
}

export interface iActivity {
  id: string;
  cover: string;
  title: { en: string; ru: string };
  seasons: Array<"summer" | "winter" | "all">;
  shortDescription: { en: string; ru: string };
  description: { en: string; ru: string };
  pictures: Array<iPicture>;
}

export interface iPlace {
  id: string;
  cover: string;
  title: { en: string; ru: string };
  seasons: Array<"summer" | "winter" | "all">;
  shortDescription: { en: string; ru: string };
  description: { en: string; ru: string };
  pictures: Array<iPicture>;
}

export interface iDictionaryItem {
  id: string;
  text: { en: string; ru: string };
}
export interface iContacts {
  email: string;
  phone: string;
  social: { [key: string]: string };
}

export interface iReview {
  date: string;
  name: string;
  country: string | null;
  tourId: string | null;
  avatar: string | null;
  text: string;
}

export interface iArticle {
  id: string;
  title: { en: string; ru: string };
  description: { en: string; ru: string; cover: string };
  linkToFullVersionText?: { en: string; ru: string; cover: string };
  cover?: string | null;
  text?: { en: string; ru: string };
  pictures?: Array<iPicture>;
  video?: Array<{
    src: string;
    description: { en: string; ru: string };
  }> | null;
}

type BaseContextType = {
  language: "en" | "ru" | null;
  setLanguage: (lang: "en" | "ru") => void;
  season: iSeason | null;
  dictionary: Array<iDictionaryItem> | null;
  contacts: iContacts | null;
  allTours: Array<iTour> | null;
  allActivities: Array<iActivity> | null;
  allPlaces: Array<iPlace> | null;
  allSeasons: Array<iSeason> | null;
  allReviews: Array<iReview> | null;
  allArticles: Array<iArticle> | null;
};

interface BaseContextProps {
  children: ReactNode;
}

export const BaseContext = createContext<BaseContextType | undefined>(undefined);

export function BaseContextProvider({ children }: BaseContextProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const setLanguage = useCallback(
    (lang: "en" | "ru") => {
      const pathname = location.pathname.replace(/^\/(?:en|ru)\/?|^\/?$/, `/${lang}/`);
      navigate({
        pathname,
        search: location.search,
        hash: location.hash,
      });
    },
    [location, navigate],
  );
  const languagePart = location.pathname.split("/")[1]?.toLowerCase();
  const language = languagePart === "en" || languagePart === "ru" ? languagePart : "ru";

  const [dictionary, setDictionary] = useState<Array<iDictionaryItem> | null>(null);
  const [season, setSeason] = useState<iSeason | null>(null);
  const [contacts, setContacts] = useState<iContacts | null>(null);

  const [allSeasons, setAllSeasons] = useState<Array<iSeason> | null>(null);
  const [allActivities, setAllActivities] = useState<Array<iActivity> | null>(null);
  const [allPlaces, setAllPlaces] = useState<Array<iPlace> | null>(null);
  const [allTours, setAllTours] = useState<Array<iTour> | null>(null);
  const [allReviews, setAllReviews] = useState<Array<iReview> | null>(null);
  const [allArticles, setAllArticles] = useState<Array<iArticle> | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!dictionary) {
      getData(`dictionary.json`).then((result: Array<{ id: string; text: { en: string; ru: string } }>) => {
        if (!ignore) {
          setDictionary(result);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [dictionary]);

  useEffect(() => {
    let ignore = false;
    if (!allSeasons || !season || !language) {
      getData(`settings.json`).then(
        (defaultSettings: {
          defaultSeason: "summer" | "winter";
          defaultLanguage: "en" | "ru";
          seasons: Array<iSeason>;
          contacts: iContacts;
        }) => {
          if (!ignore) {
            setAllSeasons(defaultSettings.seasons);
            setContacts(defaultSettings.contacts);
            setLanguage(defaultSettings.defaultLanguage);
            const season = defaultSettings.seasons.find((item) => item.id === defaultSettings.defaultSeason);
            if (season) {
              setSeason(season);
            }
          }
        },
      );
    }
    return () => {
      ignore = true;
    };
  }, [allSeasons, language, season, setLanguage]);

  useEffect(() => {
    let ignore = false;
    if (!allActivities) {
      getData(`activities/all.json`).then((result: Array<string>) => {
        const activityPromises = result.map((activityId) => getData(`activities/${activityId}/data.json`));
        Promise.all(activityPromises).then((activities) => {
          if (!ignore) {
            setAllActivities(activities);
          }
        });
      });
    }
    return () => {
      ignore = true;
    };
  }, [allActivities]);

  useEffect(() => {
    let ignore = false;
    if (!allPlaces) {
      getData(`places/all.json`).then((result: Array<string>) => {
        const placePromises = result.map((placeId) => getData(`places/${placeId}/data.json`));
        Promise.all(placePromises).then((places) => {
          if (!ignore) {
            setAllPlaces(places);
          }
        });
      });
    }
    return () => {
      ignore = true;
    };
  }, [allPlaces]);

  useEffect(() => {
    let ignore = false;
    if (!allTours) {
      getData(`tours/all.json`).then((result: Array<string>) => {
        const tourPromises = result.map((tourId) => getData(`tours/${tourId}/data.json`));
        Promise.all(tourPromises).then((tours) => {
          if (!ignore) {
            setAllTours(tours);
          }
        });
      });
    }
    return () => {
      ignore = true;
    };
  }, [allTours]);

  useEffect(() => {
    let ignore = false;
    if (!allReviews) {
      getData(`reviews/data.json`).then((reviews: Array<iReview>) => {
        if (!ignore) {
          setAllReviews(reviews);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [allReviews]);

  useEffect(() => {
    let ignore = false;
    if (!allArticles) {
      getData(`articles/all.json`).then((result: Array<string>) => {
        const articlePromises = result.map((articleId) => getData(`articles/${articleId}/data.json`));
        Promise.all(articlePromises).then((articles) => {
          if (!ignore) {
            setAllArticles(articles);
          }
        });
      });
    }
    return () => {
      ignore = true;
    };
  }, [allArticles]);

  return (
    <BaseContext.Provider
      value={{
        allTours,
        allActivities,
        allPlaces,
        allSeasons,
        allReviews,
        allArticles,
        season,
        contacts,
        language,
        dictionary,
        setLanguage,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
}
