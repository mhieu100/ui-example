import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./component/share/not.found";
import HomePage from "./page/client/home";
import DashboardPage from "./page/admin/dashboard";
import LayoutApp from "./component/layout/layout.app";
import LayoutClient from "./component/layout/layout.client";
import LayoutAdmin from "./component/layout/layout.admin";
import LoginPage from "./page/login";
import RegisterPage from "./page/register";
import ProtectedRoute from "./component/share/protected-route";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LayoutApp><LayoutClient /></LayoutApp>),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
      ],
    },

    {
      path: "/admin",
      element: (<LayoutApp><LayoutAdmin /> </LayoutApp>),
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
        }
      ],
    },


    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
