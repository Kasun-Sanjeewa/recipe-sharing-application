import { useEffect, useState } from "react";
import PreviousSearches from "../components/PreviousSearches";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                setFilteredRecipes(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching recipes:", err);
                setLoading(false);
            });
    }, []);

    const handleSearch = (term) => {
        if (term.toLowerCase() === "all") {
            setFilteredRecipes(recipes);
        } else {
            const filtered = recipes.filter((recipe) =>
                recipe.title.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredRecipes(filtered);
        }
    };

    return (
        <div>
            <PreviousSearches onSearch={handleSearch} />

            {loading ? (
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="recipes-container">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    ) : (
                        <p style={{ textAlign: "center", marginTop: "2rem" }}>No recipes found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
