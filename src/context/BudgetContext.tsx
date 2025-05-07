import React, { useReducer, createContext } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: React.ReactNode
}

// Context: donde se guardan los datos
export const BudgetContext = createContext<BudgetContextProps>(null!)

// Provider: de donde vienen los datos
export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // Conectar el provider con el contexto

    // El provider es el que va a envolver a toda la aplicacion en el main.tsx

    // Se crea un custom hook para usar el contexto
    return (
        <BudgetContext.Provider 
            value={{ state, dispatch }}
        >
            {children}
        </BudgetContext.Provider>
    )
}