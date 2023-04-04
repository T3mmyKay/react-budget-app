import { redirect } from "react-router-dom";
import { deleteitem } from "../helpers.js";
//library
import { toast } from "react-toastify";

export async function logoutAction() {
    deleteitem({key: "userName"});
    deleteitem({key: "budgets"});
    deleteitem({key: "expenses"});

    toast.success("You've deleted your account!")
    return redirect('/')
}
