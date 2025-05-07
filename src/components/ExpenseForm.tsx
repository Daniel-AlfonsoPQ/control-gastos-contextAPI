import { categories } from "../data/categories";
import { useState } from "react";
import DatePicker from "react-date-picker";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";



export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleChangeDate = (date: Value) => {
        setExpense({
            ...expense,
            date
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes('')) {
            setError('Por favor completa todos los campos');
            return;
        }
        if (expense.amount <= 0) {
            setError('Por favor añade una cantidad valida');
            return;
        }
        if (expense.date === null) {
            setError('Por favor añade una fecha valida');
            return;
        }
        console.log('Gasto registrado:', expense);
        setError(null);
        // Reiniciar el formulario
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
    }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            Nuevo Gasto
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>
        }

        <div className="flex flex-col gap-2">
            <label
                htmlFor="expenseName"
                className="text-xl"
            >
                Nombre Gasto:
            </label>
            <input 
                type="text"
                id="expenseName"
                placeholder="Añadir el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
                />
        </div>

        <div className="flex flex-col gap-2">
            <label
                htmlFor="amount"
                className="text-xl"
            >
                Cantidad:
            </label>
            <input 
                type="number"
                min={0}
                id="amount"
                placeholder="Añadir la cantidad del gasto: ej. $200"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                />
        </div>

        <div className="flex flex-col gap-2">
            <label
                htmlFor="category"
                className="text-xl"
            >
                Categoria:
            </label>
            <select 
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
                >
                    <option value="">-- Selecciona una Categoria --</option>
                    {categories.map((category) => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label
                htmlFor="amount"
                className="text-xl"
            >
                Fecha Gasto:
            </label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

        <input 
            type="submit" 
            className="bg-blue-600 text-white w-full font-bold text-xl p-2 uppercase rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300"
            value="Registrar Gasto"
        
        />
    </form>
  )
}
