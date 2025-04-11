import { useState, useEffect } from "react";

export default function RecipeModal({ recipe, onClose }) {
    const [timer, setTimer] = useState(recipe.cookingTime * 60);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (running && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, timer]);

    const formatTime = (sec) => {
        const mins = Math.floor(sec / 60);
        const secs = sec % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} className="modal-image" />

                <h3>Ingredients</h3>
                <ul>
                    {(recipe.ingredients || ["Ingredient 1", "Ingredient 2"]).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>

                <h3>Instructions</h3>
                <ol>
                    {(recipe.instructions || ["Step 1", "Step 2"]).map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>

                <button className="favorite-btn">🤍 Save to Favorites</button>

                <div className="timer-section">
                    <h4>⏱ Cooking Timer: {formatTime(timer)}</h4>
                    <button onClick={() => setRunning(true)} disabled={running}>Start</button>
                    <button onClick={() => setRunning(false)}>Pause</button>
                    <button onClick={() => { setRunning(false); setTimer(recipe.cookingTime * 60); }}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
