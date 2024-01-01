import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Index from './routes/Index.tsx'
import SignUp, { action as signUpAction} from './routes/SignUp.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "sign-in",
        element: <h1>Sign in page</h1>
      },
      {
        path: "sign-up",
        action: signUpAction,
        element: <SignUp />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
