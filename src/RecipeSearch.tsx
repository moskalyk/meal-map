import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip, Button, Box } from "@mui/material";

const RecipeSearch = (props: any) => {
    const [selectedIngredients, setSelectedRecipes] = useState<string[]>([]);
    const [recipes, setRecipes] = useState(null)
    useEffect(() => {
        setTimeout(async () => {
            const res = await fetch('/recipes.json');
            const data = await res.json();

            // Flatten the list of ingredients
            const allIngredients = data.flatMap((recipe) =>
                recipe.ingredients.map((ingredient) => ingredient.ingredient)
            );

            setRecipes(allIngredients); // Set the flattened list
        }, 0);
    
    }, [])
    
    const findBestRecipeBasedOnIngredients = (selectedIngredients, recipes) => {
        if (!recipes) return null;

        // Map recipes to the number of matching ingredients
        const recipeMatches = recipes.map((recipe) => {
            const matchingIngredients = recipe.ingredients.filter((ingredient) =>
                selectedIngredients.includes(ingredient.ingredient)
            );
            return { title: recipe.title, matchCount: matchingIngredients.length };
        });

        // Find the recipe with the highest match count
        const bestRecipe = recipeMatches.reduce((best, current) =>
            current.matchCount > best.matchCount ? current : best,
            { title: null, matchCount: 0 }
        );

        return bestRecipe.matchCount > 0 ? bestRecipe.title : null;
    };


    const handleSearch = async () => {
        const res = await fetch('/recipes.json');
        const data = await res.json();
        const recipeTitle = findBestRecipeBasedOnIngredients(selectedIngredients, data)
        console.log(recipeTitle)
        const selectedRecipe = data.find((r) => r.title === recipeTitle);

        props.setRecipeViewing(selectedRecipe)
        props.set
    };

    return (
        <div style={{marginTop: '-280px'}}>
        <p style={{fontFamily: 'Gothic', fontSize: '80px'}}>Cuizine</p>

        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ maxWidth: 500, margin: "auto", mt: 4 }}
        >
            <Autocomplete
                style={{border: 'grey'}}
                multiple
                options={recipes}
                value={selectedIngredients}
                onChange={(event, newValue) => setSelectedRecipes(newValue)}
                renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip
                            key={option}
                            label={option}
                            {...getTagProps({ index })}
                            sx={{ margin: 0.5 }}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Recipes with Ingredients"
                        variant="outlined"
                        fullWidth
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "black", // Black border
                                },
                                "&:hover fieldset": {
                                    borderColor: "black", // Black border on hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "black", // Black border when focused
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "black", // Default label color
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "black", // Label color when focused
                            },
                        }}
                    />
                )}
                sx={{ width: 400 }}
            />
            <Button
                style={{height: '55px', background: 'black', color: 'white'}}
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={selectedIngredients.length === 0}
                sx={{ ml: 2 }}
            >
                Search
            </Button>
        </Box>
    </div>
    );
};

export default RecipeSearch;
