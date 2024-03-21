import React, { useEffect, useState } from "react"
import { useNavigate, useRoutes } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import globalSlice from "src/redux/globalSlice"
import { jwtDecode } from "jwt-decode"
import SpinCustom from "src/components/SpinCustom"
import NotFoundPage from "src/pages/ErrorPage/NotFoundPage"
import { globalSelector } from "src/redux/selector"
import UserService from "./services/UserService"
import GenreService from "./services/GenreService"
import socket from "./utils/socket"
import DeactiveModal from "./components/ModalCustom/DeactiveModal"
import moment from "moment"
import ExpiredPremiumModal from "./components/ModalCustom/ExpiredPremiumModal"


// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import('src/pages/ANONYMOUS/AnonymousRoutes'))
const HomePage = React.lazy(() => import('src/pages/ANONYMOUS/HomePage'))
const LoginPage = React.lazy(() => import('src/pages/ANONYMOUS/LoginPage'))
const SignupPage = React.lazy(() => import('src/pages/ANONYMOUS/SignupPage'))
const ComicContent = React.lazy(() => import('src/pages/ANONYMOUS/ComicContent'))
const ComicDetail = React.lazy(() => import('src/pages/ANONYMOUS/ComicDetail'))
const Genres = React.lazy(() => import('src/pages/ANONYMOUS/Genres'))
const Authors = React.lazy(() => import('src/pages/ANONYMOUS/Authors'))
const AuthorDetail = React.lazy(() => import('src/pages/ANONYMOUS/AuthorDetail'))
const Premium = React.lazy(() => import('src/pages/ANONYMOUS/Premium'))
const PremiumDetail = React.lazy(() => import("src/pages/ANONYMOUS/PremiumDetail"))
const ForgotPassword = React.lazy(() => import("src/pages/ANONYMOUS/ForgotPassword"))
const ResetPassword = React.lazy(() => import("src/pages/ANONYMOUS/ResetPassword"))


// USER
const UserRoutes = React.lazy(() => import('src/pages/USER/UserRoutes'))
const UserProfile = React.lazy(() => import('src/pages/USER/UserProfile'))
const MyComic = React.lazy(() => import('src/pages/USER/MyComic'))
const ChangePassword = React.lazy(() => import('src/pages/USER/ChangePassword'))

// ADMIN
const AdminRoutes = React.lazy(() => import('src/pages/ADMIN/AdminRoutes'))
const Dashboard = React.lazy(() => import('src/pages/ADMIN/Dashboard'))
const ComicsManagement = React.lazy(() => import('src/pages/ADMIN/ComicsManagement'))
const GenresManagement = React.lazy(() => import('src/pages/ADMIN/GenresManagement'))
const UsersManagement = React.lazy(() => import('src/pages/ADMIN/UsersManagement'))
const PackagesManagement = React.lazy(() => import('src/pages/ADMIN/PackagesManagement'))
const PaymentManagement = React.lazy(() => import("src/pages/ADMIN/PaymentManagement"))

function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
          <SpinCustom />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  // USER
  {
    element: (
      <LazyLoadingComponent>
        <UserRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: '/profile',
        element: (
          <LazyLoadingComponent>
            <UserProfile />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/mycomic',
        element: (
          <LazyLoadingComponent>
            <MyComic />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/change-password',
        element: (
          <LazyLoadingComponent>
            <ChangePassword />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  // ADMIN
  {
    element: (
      <LazyLoadingComponent>
        <AdminRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <LazyLoadingComponent>
            <Dashboard />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/dashboard/packages',
        element: (
          <LazyLoadingComponent>
            <PackagesManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/dashboard/comics',
        element: (
          <LazyLoadingComponent>
            <ComicsManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/dashboard/genres',
        element: (
          <LazyLoadingComponent>
            <GenresManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/dashboard/users',
        element: (
          <LazyLoadingComponent>
            <UsersManagement />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/dashboard/payment',
        element: (
          <LazyLoadingComponent>
            <PaymentManagement />
          </LazyLoadingComponent>
        )
      }
    ]
  },
  // ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <AnonymousRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: '/',
        element: (
          <LazyLoadingComponent>
            <HomePage />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/search',
        element: (
          <LazyLoadingComponent>
            <HomePage />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/login',
        element: (
          <LazyLoadingComponent>
            <LoginPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/signup',
        element: (
          <LazyLoadingComponent>
            <SignupPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/comic/:ComicID/chapter/:ChapterID',
        element: (
          <LazyLoadingComponent>
            <ComicContent />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/comic/:ComicID',
        element: (
          <LazyLoadingComponent>
            <ComicDetail />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/genres',
        element: (
          <LazyLoadingComponent>
            <Genres />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/genre/:GenreID',
        element: (
          <LazyLoadingComponent>
            <Genres />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/authors',
        element: (
          <LazyLoadingComponent>
            <Authors />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/author/:AuthorID',
        element: (
          <LazyLoadingComponent>
            <AuthorDetail />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/premium',
        element: (
          <LazyLoadingComponent>
            <Premium />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/premium/:PackageID',
        element: (
          <LazyLoadingComponent>
            <PremiumDetail />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <LazyLoadingComponent>
            <ForgotPassword />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/reset-password',
        element: (
          <LazyLoadingComponent>
            <ResetPassword />
          </LazyLoadingComponent>
        )
      }
    ]
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFoundPage />
      </LazyLoadingComponent>
    ),
  },
]

const App = () => {

  const appRoutes = useRoutes(routes)
  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [modalDeactive, setModalDeactive] = useState(false)
  const [modalExpiredPremium, setModalExpiredPremium] = useState(false)

  console.log(global);

  const getProfile = async (token) => {
    try {
      setLoading(true)
      const res = await UserService.getDetailProfile(token)
      if (res?.isError) {
        localStorage.removeItem('token')
        return
      }
      socket.connect()
      dispatch(globalSlice.actions.setUser(res?.data))
    } finally {
      setLoading(false)
    }
  }

  const getListGenres = async () => {
    try {
      setLoading(true)
      const res = await GenreService.getAllGenres({})
      if (res?.isError) return
      dispatch(globalSlice.actions.setGenres(res?.data?.List))
    } finally {
      setLoading(false)
    }
  }

  const handleExpiredPremium = async () => {
    try {
      setLoading(true)
      const res = await UserService.handleExpiredPremium()
      if (!!res?.isError) return
      setModalExpiredPremium(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!!localStorage.getItem('token')) {
      const user = jwtDecode(localStorage.getItem('token'))
      if (!!user.payload.ID) {
        getProfile(localStorage.getItem('token'))
      } else {
        navigate('/forbidden')
      }
    }
    getListGenres()
  }, [])

  useEffect(() => {
    if (!!global?.user?.Premium && !!moment(global?.user?.Premium?.EndedAt).isBefore(moment().format("YYYY-MM-DD"))) {
      handleExpiredPremium()
    }
  }, [global?.user?.Premium])

  socket.on('get-deactive', (data) => {
    if (global?.user?._id === data) {
      setModalDeactive(true)
    }
  })

  return (
    <>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
      />
      <div>{appRoutes}</div>

      {
        !!modalDeactive &&
        <DeactiveModal
          open={modalDeactive}
          onCancel={() => setModalDeactive(false)}
        />
      }

      {
        !!modalExpiredPremium &&
        <ExpiredPremiumModal
          open={modalExpiredPremium}
          onCancel={() => setModalExpiredPremium(false)}
        />
      }
    </>
  )
}

export default App
