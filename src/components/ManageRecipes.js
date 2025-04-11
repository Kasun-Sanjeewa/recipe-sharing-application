import { useEffect, useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Divider,
    Snackbar,
    Alert
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ManageRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        ingredients: "",
        instructions: "",
        image: "",
        cookingTime: "",
        rating: 0,
        authorImg: "/img/author-default.jpg"
    });

    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

    const showAlert = (message, severity = "success") => {
        setAlert({ open: true, message, severity });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    // Fetch recipes from server
    const fetchRecipes = async () => {
        try {
            const res = await fetch("http://localhost:8000/recipes");
            const data = await res.json();
            const safeData = data.map(recipe => ({
                ...recipe,
                ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
                instructions: Array.isArray(recipe.instructions) ? recipe.instructions : []
            }));
            setRecipes(safeData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            ingredients: formData.ingredients.split(",").map(s => s.trim()),
            instructions: formData.instructions.split(".").map(s => s.trim()).filter(s => s),
        };

        try {
            if (formData.id) {
                await fetch(`http://localhost:8000/recipes/${formData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                showAlert("Recipe updated successfully!", "success");
            } else {
                await fetch("http://localhost:8000/recipes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                showAlert("Recipe added successfully!", "success");
            }

            await fetchRecipes();
            setFormData({
                id: null,
                title: "",
                ingredients: "",
                instructions: "",
                image: "",
                cookingTime: "",
                rating: 0,
                authorImg: "/img/author-default.jpg"
            });
        } catch (err) {
            console.error("Error saving recipe:", err);
            showAlert("Failed to save recipe!", "error");
        }
    };

    const handleEdit = (recipe) => {
        setFormData({
            ...recipe,
            ingredients: (recipe.ingredients || []).join(", "),
            instructions: (recipe.instructions || []).join(". "),
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:8000/recipes/${id}`, { method: "DELETE" });
            await fetchRecipes();
            showAlert("Recipe deleted successfully!", "info");
        } catch (err) {
            console.error("Error deleting recipe:", err);
            showAlert("Failed to delete recipe!", "error");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {formData.id ? "Edit Recipe" : "Add New Recipe"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField name="title" label="Title" value={formData.title} onChange={handleChange} required />
                    <TextField name="image" label="Image URL" value={formData.image} onChange={handleChange} required />
                    <TextField name="cookingTime" label="Cooking Time (in mins)" type="number" value={formData.cookingTime} onChange={handleChange} required />
                    <TextField name="rating" label="Rating (0–5)" type="number" value={formData.rating} onChange={handleChange} />
                    <TextField name="ingredients" label="Ingredients (comma separated)" value={formData.ingredients} onChange={handleChange} multiline required />
                    <TextField name="instructions" label="Instructions (separated by periods)" value={formData.instructions} onChange={handleChange} multiline required />
                    <Button type="submit" variant="contained" color="primary">
                        {formData.id ? "Update Recipe" : "Add Recipe"}
                    </Button>
                </Box>
            </Paper>

            <Typography variant="h6" sx={{ mt: 5 }}>
                All Recipes
            </Typography>
            <List>
                {recipes.map((recipe, index) => (
                    <div key={recipe.id}>
                        <ListItem>
                            <ListItemText primary={recipe.title} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" color="primary" onClick={() => handleEdit(recipe)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" color="error" onClick={() => handleDelete(recipe.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {index < recipes.length - 1 && <Divider />}
                    </div>
                ))}
            </List>

            <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
