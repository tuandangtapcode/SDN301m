import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import LayoutAdmin from "src/components/Layout/LayoutAdmin"
import ForbiddenPage from "src/pages/ErrorPage/ForbiddenPage"
import { globalSelector } from "src/redux/selector"

const AdminRoutes = () => {

  const global = useSelector(globalSelector)

  return (
    <>
      <LayoutAdmin>
        <Outlet />
      </LayoutAdmin>
      {/* {
        (!!global?.user?._id && global?.user?.RoleID === 3) ?
        <LayoutAdmin>
          <Outlet />
        </LayoutAdmin>
        :
        <ForbiddenPage />
      } */}
    </>
  );
}

export default AdminRoutes;