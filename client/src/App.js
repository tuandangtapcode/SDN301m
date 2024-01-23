import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
// import { getProfileUser } from "src/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import globalSlice from "src/redux/globalSlice";
import { jwtDecode } from "jwt-decode";
import SpinCustom from "src/components/SpinCustom";
import NotFoundPage from "src/pages/ErrorPage/NotFoundPage";
import { globalSelector } from "src/redux/selector";


// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import('src/pages/ANONYMOUS/AnonymousRoutes'));
const HomePage = React.lazy(() => import('src/pages/ANONYMOUS/HomePage'));
const LoginPage = React.lazy(() => import('src/pages/ANONYMOUS/LoginPage'));
const SignupPage = React.lazy(() => import('src/pages/ANONYMOUS/SignupPage'));
const ComicContent = React.lazy(() => import('src/pages/ANONYMOUS/ComicContent'));
const ComicDetail = React.lazy(() => import('src/pages/ANONYMOUS/ComicDetail'));
const Genres = React.lazy(() => import('src/pages/ANONYMOUS/Genres'));
const GenresDetail = React.lazy(() => import('src/pages/ANONYMOUS/GenresDetail'));
const Authors = React.lazy(() => import('src/pages/ANONYMOUS/Authors'));
const AuthorDetail = React.lazy(() => import('src/pages/ANONYMOUS/AuthorDetail'));


// USER
const UserRoutes = React.lazy(() => import('src/pages/USER/UserRoutes'));
const UserProfile = React.lazy(() => import('src/pages/USER/UserProfile'));
const MyComic = React.lazy(() => import('src/pages/USER/MyComic'));

// ADMIN
const AdminRoutes = React.lazy(() => import('src/pages/ADMIN/AdminRoutes'));
const Dashboard = React.lazy(() => import('src/pages/ADMIN/Dashboard'));


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
        path: '/genres/:GenresID',
        element: (
          <LazyLoadingComponent>
            <GenresDetail />
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
        path: '/authors/:AuthorID',
        element: (
          <LazyLoadingComponent>
            <AuthorDetail />
          </LazyLoadingComponent>
        )
      },
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

function App() {

  const appRoutes = useRoutes(routes);
  const dispatch = useDispatch();
  const global = useSelector(globalSelector);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     const user = jwtDecode(localStorage.getItem('token'));
  //     getProfile(user.payload.id);
  //   }
  // }, [])

  // const getProfile = async (id) => {
  //   try {
  //     setLoading(true);
  //     const res = await getProfileUser(id);
  //     dispatch(globalSlice.actions.setUser(res?.data));
  //   } finally {
  //     setLoading(false);
  //   }
  // }


  return (
    <>
      <ToastContainer />
      <div>{appRoutes}</div>
    </>
  );
}

export default App;
