import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    {type: 'add-budget', payload: {budget: number} } |
    {type: 'show-modal'} |
    {type: 'hide-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'delete-expense', payload: {id: Expense['id']}} |
    {type: 'get-expense-by-id', payload: {id: Expense['id']}} |
    {type: 'edit-expense', payload: { expense: Expense}} |
    {type: 'restart'} |
    {type: 'add-filter-category', payload: {id: Category['id']}} 


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false, 
    expenses: initialExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense= (DraftExpense: DraftExpense) : Expense => {
    return {
        ...DraftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState, 
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: !state.modal
        }
    }

    if (action.type === 'hide-modal') {
        return {
            ...state,
            modal: !state.modal,
            editingId: ''
        }
    }

    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if (action.type === 'delete-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'edit-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'restart') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}