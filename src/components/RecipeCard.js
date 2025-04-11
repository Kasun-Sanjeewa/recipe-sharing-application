import CustomImage from "./CustomImage";

export default function RecipeCard({ recipe }) {

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const totalStars = 5;

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push("★"); // full star
        }

        if (halfStar) {
            stars.push("☆"); // half star placeholder
        }

        while (stars.length < totalStars) {
            stars.push("✩"); // empty star
        }

        return stars.join(" ");
    };

    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%" />
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.authorImg} alt="Author" />
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>

                <div className="recipe-meta">
                    <span className="cooking-time">⏱️ {recipe.cookingTime} mins</span>
                    <span className="rating" title={`${recipe.rating}/5`}>
                        {renderStars(recipe.rating)}
                    </span>
                </div>

                <a className="view-btn" href="#!">VIEW RECIPE</a>
            </div>
        </div>
    );
}
