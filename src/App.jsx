import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard, dashBoardAction, dashboardLoader } from './pages/Dashboard'
import { Error } from './pages/Error'
import { Main, mainLoader } from './layouts/Main'
import { logoutAction } from "./actions/logout.js";
//library
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Main/>,
            loader: mainLoader,
            errorElement: <Error/>,
            children: [
                {
                    index: true,
                    element: <Dashboard/>,
                    loader: dashboardLoader,
                    action: dashBoardAction,
                    errorElement: <Error/>
                }, {
                    path: "logout",
                    action: logoutAction
                }
            ]
        },

    ])

    return (
        <div className="App">
            <RouterProvider router={router}/>
            <ToastContainer />
        </div>
    )
}

export default App
