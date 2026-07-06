import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function BudgetHelper(){
    const [budget, setBudget] = useState('');
    const [result, setResult] = useState('');

    const navigate = useNavigate()

    const calculate = () =>{
        if(!budget) return;
        const numBudget = parseFloat(budget);
        setResult({
            food:(numBudget*0.3).toFixed(0),
            transport:(numBudget*0.2).toFixed(0),
            rent:(numBudget*0.3).toFixed(0),
            others:(numBudget*0.2).toFixed(0),
        })
    }
    return(<div className="mt-8 m-2 p-1 rounded border self-start border-gray-200 shadow shadow-black">
        <h3 className="text-lg font-bold mb-4">Budget Planner</h3>
        <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Monthly Budget (LRD)</label>
            <input 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g 50,000"
                type="number"/>
            
            <button
                onClick={calculate}
                className="bg-blue-500 text-white px-4 py-2 rounded m-2 font-bold text-xl"
                >Calculate</button>
            
            {result && (<div className="mt-4">
                <p className="text-normal font-medium mb-2">Alocation: </p>
                <ul className="space-y-2">
                    <li className="flex"><span>Food:</span> <span>$ {result.food}</span> </li>
                    <li className="flex"><span>Transport:</span> <span>$ {result.transport}</span> </li>
                    <li className="flex"><span>Rent:</span> <span>$ {result.rent}</span> </li>
                    <li className="flex"><span>Others:</span> <span>$ {result.others}</span> </li>
                </ul>

            </div>)}
        </div>
        <button 
            onClick={() => navigate('/budget/planer')}
            className="m-2 bg-green-50 rounded p-1 text-green-700 transition active:scale-105">view in full</button>
    </div>)
}