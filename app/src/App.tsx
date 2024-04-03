import { Route, Routes } from "react-router-dom";
import { NoMatch } from "./routes/noMatch.tsx";
import MainPage from "./routes/mainPage/MainPage.tsx";
import { BaseContextProvider } from "./contexts/BaseContext.tsx";
import ToursPage from "./routes/toursPage/ToursPage.tsx";
import TourPage from "./routes/tourPage/TourPage.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import PlacesPage from "./routes/placesPage/PlacesPage.tsx";
import ActivitiesPage from "./routes/activitiesPage/ActivitiesPage.tsx";
import PlacePage from "./routes/placePage/PlacePage.tsx";
import ActivityPage from "./routes/activityPage/ActivityPage.tsx";
import GuestBookPage from "./routes/guestBookPage/GuestBookPage.tsx";
import ArticlePage from "./routes/articlePage/ArticlePage.tsx";
import ArticlesPage from "./routes/articlesPage/ArticlesPage.tsx";
import TeamPage from "./routes/teamPage/TeamPage.tsx";
import FAQPage from "./routes/faqPage/FAQPage.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BaseContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:lang" element={<MainPage />} />

          <Route path="/:lang/tours" element={<ToursPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/:lang/tours/:tourId" element={<TourPage />} />
          <Route path="/tours/:tourId" element={<TourPage />} />

          <Route path="/:lang/places" element={<PlacesPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/:lang/places/:placeId" element={<PlacePage />} />
          <Route path="/places/:placeId" element={<PlacePage />} />

          <Route path="/:lang/activities" element={<ActivitiesPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/:lang/activities/:activityId" element={<ActivityPage />} />
          <Route path="/activities/:activityId" element={<ActivityPage />} />

          <Route path="/:lang/articles" element={<ArticlesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/:lang/articles/:articleId" element={<ArticlePage />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />

          <Route path="/:lang/guest-book" element={<GuestBookPage />} />
          <Route path="/guest-book" element={<GuestBookPage />} />
          <Route path="/:lang/team" element={<TeamPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/:lang/faq" element={<FAQPage />} />
          <Route path="/faq" element={<FAQPage />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BaseContextProvider>
    </ThemeProvider>
  );
}

export default App;
