import { useEffect, useState } from "react";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true); // 👈 new state

    useEffect(() => {
        fetch("http://localhost:8000/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false); // 👈 stop loading
            })
            .catch((err) => {
                console.error("Error fetching recipes:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <PreviousSearches />

            {loading ? (
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="recipes-container">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
}
