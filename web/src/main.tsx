import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'

import Root from '@/routes/Root'
import Home from '@/routes/Home'
import SignIn from '@/routes/SignIn'
import SignUp from '@/routes/SignUp'
import SocketIoProvider from '@/components/providers/SocketIoProvider'
import Room from '@/routes/Room'

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
      {
        path: 'room/:roomId',
        element: <Room />,
      },
    ],
  },
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketIoProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SocketIoProvider>
  </StrictMode>
)
