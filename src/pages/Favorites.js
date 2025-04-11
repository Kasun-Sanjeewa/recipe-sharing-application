import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = () => {
        fetch("http://localhost:8000/favorites")
            .then((res) => res.json())
            .then((data) => {
                setFavorites(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching favorites:", err);
                setLoading(false);
            });
    };

    const handleRemoveFavorite = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/favorites/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setFavorites((prev) => prev.filter((fav) => fav.id !== id));
                alert("Recipe removed from favorites 💔");
            } else {
                throw new Error("Failed to remove");
            }
        } catch (err) {
            console.error("Error removing favorite:", err);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: "center", margin: "2rem 0" }}>❤️ Your Favorite Recipes</h2>

            {loading ? (
                <div className="loading-spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="recipes-container">
                    {favorites.length > 0 ? (
                        favorites.map((recipe) => (
                            <div key={recipe.id} className="recipe-card-wrapper">
                                <RecipeCard recipe={recipe} />
                                <button
                                    className="remove-fav-btn"
                                    onClick={() => handleRemoveFavorite(recipe.id)}
                                >
                                    ✖  Remove from Favorites
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", marginTop: "2rem" }}>
                            No favorites saved yet.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
