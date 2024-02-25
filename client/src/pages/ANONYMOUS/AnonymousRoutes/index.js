import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import MainLayout from "src/components/Layout/MainLayout"
import OtherLayout from "src/components/Layout/OtherLayout"
import { globalSelector } from "src/redux/selector"

const AnonymousRoutes = () => {

  const global = useSelector(globalSelector)
const location = useLocation()
  const urlOtherLayout = ["chapter", "comic"]
  const check = urlOtherLayout.every(i => location.pathname.includes(i))

  return (

    <>
      {
        (global?.user?.RoleID !== 1) ?
!check ?
          <MainLayout>
            <Outlet />
          </MainLayout>
          :
<OtherLayout>
              <Outlet />
            </OtherLayout>
          :
          <Navigate to={'/dashboard'} />
      }
    </>
  )
}

export default AnonymousRoutes