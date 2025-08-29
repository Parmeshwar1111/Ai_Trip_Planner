import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './Create-Trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/Index.jsx';
import MyTrips from './my-trips/index.jsx'
import './index.css'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: "/create-trip",
    element: <CreateTrip />
  },
  //we will use dynamic routing here
  {
    path: '/view-trip/:tripId',//: before tripId is use to pass any value in place of tripId
    element: <ViewTrip />
  },
  {
    path: '/my-trips',
    element: <MyTrips />
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
