import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Dashboard, dashBoardAction, dashboardLoader } from './pages/Dashboard'
import { Error } from './pages/Error'
import { Main, mainLoader } from './layouts/Main'
import { logoutAction } from "./actions/logout.js";
//library
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { expensesAction, expensesLoader, ExpensesPage } from "./pages/ExpensesPage.jsx";
import { budgetAction, budgetLoader, BudgetPage } from "./pages/BudgetPage.jsx";
import { deleteBudget } from "./actions/deleteBudget.js";

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
                },
                {
                    path: "expenses",
                    element: <ExpensesPage/>,
                    loader: expensesLoader,
                    action: expensesAction,
                    errorElement: <Error/>

                },
                {
                    path: "budget/:id",
                    element: <BudgetPage/>,
                    loader: budgetLoader,
                    action: budgetAction,
                    errorElement: <Error/>,
                    children: [
                        {
                            path: "delete",
                            action: deleteBudget,
                        }
                    ]

                },
                {
                    path: "logout",
                    action: logoutAction
                }
            ]
        },

    ])

    return (
        <div className="App">
            <RouterProvider router={router}/>
            <ToastContainer/>
        </div>
    )
}

export default App
