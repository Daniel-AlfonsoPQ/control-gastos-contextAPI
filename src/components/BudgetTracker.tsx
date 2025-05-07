import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="/public/grafico.jpg" alt="Gráfica de gastos" />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button
                type = "button"
                className="bg-pink-600 text-white font-bold p-2 rounded-lg w-full uppercase cursor-pointer"
            >
                Resetear App
            </button>

            <AmountDisplay 
                label="Presupuesto"
                amount={200}
            />
            <AmountDisplay 
                label="Disponible"
                amount={200}
            />
            <AmountDisplay 
                label="Gastado"
                amount={200}
            />
        </div>
    </div>
  )
}
