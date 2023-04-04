export const wait =()=> new Promise(res => setTimeout(res, Math.random() * 2000))

const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;

    return `${existingBudgetLength * 34} 65% 50%`
}

//Local storage functions
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
//create budget
export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor(),
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]))
}
//create budget
export const createExpense = ({name, amount, budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    }


    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]))
}
//delete item
export const deleteitem = ({key}) => {
    return localStorage.removeItem(key)
}
