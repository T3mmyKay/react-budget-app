import { Form, useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid/index.js";
import { useEffect, useRef } from "react";

export const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state ==="submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(()=>{
        if (!isSubmitting){
            formRef.current.reset();
            focusRef.current.focus();
        }
    },[isSubmitting])
    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create budget
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input
                        ref={focusRef}
                        type="text"
                        name="newBudget"
                        id="newBudget"
                        placeholder="e.g., Groceries"
                        required/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">
                        Amount
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="e.g., $350"
                        required
                        inputMode="decimal"
                    />
                </div>
                <input readOnly type="hidden" name="_action" value="createBudget"/>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn--dark">
                    {
                      isSubmitting ? <span>Submitting...</span> : (
                          <><span>Create budget</span><CurrencyDollarIcon width={20}/></>)
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}
