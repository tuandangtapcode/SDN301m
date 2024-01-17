import { Outlet } from "react-router-dom";
import MainLayout from "src/components/Layout/MainLayout";

const AnonymousRoutes = () => {

  return (

    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default AnonymousRoutes;