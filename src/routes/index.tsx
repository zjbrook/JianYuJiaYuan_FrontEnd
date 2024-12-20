import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "../layout/homeLayout";
import LoginLayout from "../layout/loginLayout";
import {
  loginPath,
  homeOverviewPath,
  featureDevelopment,
  productProjectPath,
  problemTrackingPath,
  teamMembersPath,
  lifeForumPath,
  personalInformationPath,
  dailyTodoListPath,
} from "../consts/pathname";
import LoginPage from "../pages/Login";
import HomeOverview from "../pages/HomeOverview";
import ProductProject from "../pages/ProductProject";
import FeatureDevelopment from "../pages/FeatureDevelopment";
import ProblemTracking from "../pages/ProblemTracking";
import TeamMembers from "../pages/TeamMembers";
import LifeForum from "../pages/LifeForum";
import PersonalInformation from "../pages/PersonalInformation";
import DailyTodoList from "../pages/DailyTodoList";

function Router() {
  const homeRoutesConfig = [
    {
      path: homeOverviewPath,
      component: <HomeOverview />,
    },
    {
      path: productProjectPath,
      component: <ProductProject />,
    },
    {
      path: featureDevelopment,
      component: <FeatureDevelopment />,
    },
    {
      path: problemTrackingPath,
      component: <ProblemTracking />,
    },
    {
      path: teamMembersPath,
      component: <TeamMembers />,
    },
    {
      path: lifeForumPath,
      component: <LifeForum />,
    },
    {
      path: personalInformationPath,
      component: <PersonalInformation />,
    },
    {
      path: dailyTodoListPath,
      component: <DailyTodoList />,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <HomeOverview />
            </HomeLayout>
          }
        />
        {homeRoutesConfig.map(({ path, component }) => {
          console.log("[debug] path:", path);
          return (
            <Route
              path={path}
              key={path}
              element={<HomeLayout>{component}</HomeLayout>}
            />
          );
        })}
        <Route
          path={loginPath}
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
