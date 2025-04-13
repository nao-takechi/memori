import { RouteObject } from "react-router-dom";
import Daily from "../pages/Daily";

const routes: RouteObject[] = [
  {
    path: "/daily",
    element: <Daily />,
  },
];

export default routes;
