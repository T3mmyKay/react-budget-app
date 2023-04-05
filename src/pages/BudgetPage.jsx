import { createExpense, deleteItem, getAllMatchingItems } from "../helpers.js";
import { useLoaderData } from "react-router-dom";
import { BudgetItem } from "../components/BudgetItem.jsx";
import { AddExpenseForm } from "../components/AddExpenseForm.jsx";
import { Table } from "../components/Table.jsx";
import { toast } from "react-toastify";

export async function budgetLoader({params}) {
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0];
    const expenses = getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });
    if (!budget) {
        throw new Error("The budget you are trying to find does not exist");
    }
    return {budget, expenses}
}

export async function budgetAction({request}) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            })
            return toast.success(`Expense deleted!`)
        } catch (e) {
            throw new Error("There was a problem deleting your expense.")
        }
    } else if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
        }
    }
}

export const BudgetPage = () => {
    const {budget, expenses} = useLoaderData();
    return (
        <>
            <div
                style={{
                    "--accent": budget.color,
                }}
                className="grid-lg">
                <h1 className="h2">
                    <span className="accent">{budget.name} </span>
                    Overview
                </h1>
                <div className="flex-lg">
                    <BudgetItem budget={budget} showDelete={true}/>
                    <AddExpenseForm budgets={[budget]}/>
                </div>
                {
                    expenses && expenses.length > 0 && (
                        <div className="grid-md">
                            <h2>
                                <span className="accent">{budget.name} </span>
                                Expenses
                            </h2>
                            <Table expenses={expenses} showBudget={false}/>
                        </div>
                    )
                }
            </div>
        </>
    )
}
