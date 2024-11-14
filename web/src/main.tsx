import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import SocketIoProvider from './components/providers/SocketIoProvider.tsx'
import Root from './routes/Root.tsx'
import SignIn from './routes/SignIn.tsx'
import SignUp from './routes/SignUp.tsx'
import Home from './routes/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketIoProvider>
      <RouterProvider router={router} />
    </SocketIoProvider>
  </StrictMode>
)
