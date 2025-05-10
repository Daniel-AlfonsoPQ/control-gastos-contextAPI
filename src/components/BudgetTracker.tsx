import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css';

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch } = useBudget();

    const percentage = +((totalExpenses * 100) / state.budget).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar 
                value={percentage}
                styles={buildStyles({
                    pathColor: remainingBudget <= 0 ? '#DC2626' : '#3B82F6',
                    textColor: remainingBudget <= 0 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F1F5F9',
                    textSize: 8,
                })}
                text={`${percentage}% Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button
                type = "button"
                className="bg-pink-600 text-white font-bold p-2 rounded-lg w-full uppercase cursor-pointer"
                onClick = {() => dispatch({type: 'restart'})}
            >
                Resetear App
            </button>

            <AmountDisplay 
                label="Presupuesto"
                amount={state.budget}
            />
            <AmountDisplay 
                label="Disponible"
                amount={remainingBudget}
            />
            <AmountDisplay 
                label="Gastado"
                amount={totalExpenses}
            />
        </div>
    </div>
  )
}
