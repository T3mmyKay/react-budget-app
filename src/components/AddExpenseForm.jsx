import { useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid/index.js";

export const AddExpenseForm = ({budgets}) => {
    const fetcher = useFetcher();
    const formRef = useRef();
    const focusRef = useRef();
    const isSubmitting = useFetcher().state === "submitting";

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting])
    return (
        <div className="form-wrapper">
            <h2 className="h3">Add New
                <span className="accent">
                    {budgets.length === 1 && `${budgets.map(budg => budg.name)}`}
                </span>{" "}
                Expense
            </h2>
            <fetcher.Form
                method="POST"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="e.g, Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input
                            type="number"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            step="0.1"
                            placeholder="e.g., 9.30"
                            required
                            inputMode="decimal"
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets.sort((a, b) => a.createdAt - b.createdAt).map(budget => {
                                return (
                                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense" readOnly/>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn--dark">
                    {
                        isSubmitting ? <span>Submitting...</span> : (
                            <><span>Add Expense</span><CurrencyDollarIcon width={20}/></>)
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}
