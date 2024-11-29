import { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip, Button, Box } from "@mui/material";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initialize based on screen width

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  return isMobile;
};

const RecipeSearch = (props: any) => {
    const [selectedIngredients, setSelectedRecipes] = useState<string[]>([]);
    const [recipes, setRecipes] = useState(null)
    const isMobile = useIsMobile()

    useEffect(() => {
        setTimeout(async () => {
            const res = await fetch('/recipes.json');
            const data = await res.json();

            // Flatten the list of ingredients
            const allIngredients = data.flatMap((recipe: any) =>
                recipe.ingredients.map((ingredient: any) => ingredient.ingredient)
            );

            setRecipes(allIngredients); // Set the flattened list
        }, 0);
    
    }, [])
    
    const findBestRecipeBasedOnIngredients = (selectedIngredients: any, recipes: any) => {
        if (!recipes) return null;

        // Map recipes to the number of matching ingredients
        const recipeMatches = recipes.map((recipe: any) => {
            const matchingIngredients = recipe.ingredients.filter((ingredient: any) =>
                selectedIngredients.includes(ingredient.ingredient)
            );
            return { title: recipe.title, matchCount: matchingIngredients.length };
        });

        // Find the recipe with the highest match count
        const bestRecipe = recipeMatches.reduce((best: any, current: any) =>
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
        const selectedRecipe = data.find((r: any) => r.title === recipeTitle);

        props.setRecipeViewing(selectedRecipe)
        props.set
    };

    return (
        <>
      {/* @ts-ignore */}

        <div style={{marginTop: !isMobile && '-280px'}}>
        <p style={{fontFamily: 'Gothic', fontSize: '80px'}}>Cuizine</p>

        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ maxWidth: !isMobile ? 500 : 250, margin: "auto", mt: 4 }}
        >
            <Autocomplete
                style={{border: 'grey'}}
                multiple
                            // @ts-ignore
                options={recipes}
                value={selectedIngredients}
                            // @ts-ignore
                onChange={(event, newValue) => setSelectedRecipes(newValue)}
                            // @ts-ignore

                renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip
                            // @ts-ignore

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
    </>
    );
};

export default RecipeSearch;
