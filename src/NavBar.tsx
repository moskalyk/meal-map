import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography, Grid } from "@mui/material";
import JSONWidget from "./JSONWIdget";
import versusLogo from "./assets/versus.energy.png";
import SunBurstWidget from "./SunBurstWidget";

const TabPanel = ({ children, value, index }: any) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const NavBar = (props: any) => {
  const [recipes, setRecipes] = useState(null);

  const handleChange = (_: any, newValue: any) => {
    props.setValue(newValue);
  };

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("/recipes.json");
      const data = await res.json();
      console.log(data);
      setRecipes(data);
    }, 0);
  }, []);

  const viewRecipe = async (recipeTitle: any) => {
    try {
      const res = await fetch("/recipes.json");
      const data = await res.json();

      // Find the recipe that matches the provided title
      const selectedRecipe = data.find((r: any) => r.title === recipeTitle);

      // Set the recipe for viewing
      if (selectedRecipe) {
        props.setRecipeViewing(selectedRecipe);
      } else {
        console.error("Recipe not found!");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const prepareSunburstData = (recipes: any) => {
    // Calculate totals for each category across all recipes
    const totalNutrition = recipes.reduce(
      (totals: any, recipe: any) => {
        totals.protein += parseFloat(recipe.nutritionFacts.protein);
        totals.fat += parseFloat(recipe.nutritionFacts.fat);
        totals.carbohydrates += parseFloat(recipe.nutritionFacts.carbohydrates);
        return totals;
      },
      { protein: 0, fat: 0, carbohydrates: 0 },
    );

    console.log(totalNutrition);
    // Create the data structure
    return {
      name: "Total Nutrition",
      children: [
        {
          name: "Protein",
          value: totalNutrition.protein,
          children: recipes.map((recipe: any) => ({
            name: `${recipe.title} (Protein)`,
            value: parseFloat(recipe.nutritionFacts.protein) * 400,
          })),
        },
        {
          name: "Fat",
          value: totalNutrition.fat,
          children: recipes.map((recipe: any) => ({
            name: `${recipe.title} (Fat)`,
            value: parseFloat(recipe.nutritionFacts.fat) * 400,
          })),
        },
        {
          name: "Carbohydrates/Fiber",
          value: totalNutrition.carbohydrates,
          children: recipes.map((recipe: any) => ({
            name: `${recipe.title} (Carbohydrates)`,
            value: parseFloat(recipe.nutritionFacts.carbohydrates) * 400,
          })),
        },
      ],
    };
  };

  const [sunburstData, setSunburstData] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("/recipes.json");
      const data = await res.json();
      // @ts-ignore
      setSunburstData(prepareSunburstData(data));
    }, 0);
  }, []);

  useEffect(() => {}, [sunburstData]);

  return (
    <Box sx={{ width: "900px", textAlign: "center" }}>
      {/* Tabs Navigation */}
      <Box
        sx={{
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          marginTop: "100px",
          position: "fixed", // Fixed at the top
          top: 0,
          zIndex: 1000, // Ensures it stays above other content
          bgcolor: "white", // Background color to prevent transparency issues
        }}
      >
        <Tabs
          value={props.value}
          onChange={handleChange}
          aria-label="disable native highlight tabs"
          centered
          TabIndicatorProps={{
            style: { backgroundColor: "black" }, // Customize the underline color
          }}
        >
          <Tab
            label="Home"
            sx={{
              "&:focus": {
                color: "black",

                outline: "none", // Remove focus outline
              },
            }}
          />
          <Tab
            label="About"
            sx={{
              "&:focus": {
                color: "black",

                outline: "none", // Remove focus outline
              },
            }}
          />
          <Tab
            label="Nutrition"
            sx={{
              "&:focus": {
                color: "black",
                outline: "none", // Remove focus outline
              },
            }}
          />
          <Tab
            label="Tools"
            sx={{
              "&:focus": {
                color: "black",

                outline: "none", // Remove focus outline
              },
            }}
          />
          <Tab
            label="API"
            sx={{
              "&:focus": {
                color: "black",

                outline: "none", // Remove focus outline
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={props.value} index={0}>
        <Grid container spacing={2} style={{ marginTop: "100px" }}>
          {[
            "Main",
            "Sides",
            "Sweet",
            "Toppings",
            "Snack",
            "Basic",
            "Exotic",
            "Lifestyle",
            "Other",
          ].map((title, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: 250,
                  // position: "relative",
                  borderRadius: 1,
                  overflow: "hidden",
                  textAlign: "center",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3>{title}</h3>
                <hr />
                  {/* @ts-ignore*/}

                <ul class="recipe-list">
                  {/* @ts-ignore*/}
                  {recipes && recipes.map((recipe: any) => {
                      if (recipe.category == title) {
                        return (
                          <>
                            <li
                              onClick={() => viewRecipe(recipe.title)}
                              style={{
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              {recipe.title}
                            </li>
                            <br />
                          </>
                        );
                      } else {
                      }
                    })}
                </ul>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <p>
          A personal blog to map and keep track of recipes I like making, or
          have made. Are.na for food memory.
          <br />
          <br />
          Some recipes come from other sources, family or friends, where I've
          changed an ingredient.
          <br />
          <br />
          Additions to site welcome. email:{" "}
          <a href="mailto:morgan.moskalyk@protonmail.ch">
            morgan.moskalyk@protonmail.ch
          </a>
        </p>
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Sitewide Caloric Breakdown</h2>

        <SunBurstWidget data={sunburstData} />
        <br />
        <br />
        <br />
        <h2>Nutritional Tricks</h2>
        <p style={{ textAlign: "left" }}>
          The{" "}
          <a
            href="https://en.wikipedia.org/wiki/Glycemic_index"
            target="_blank"
            rel="noopener noreferrer"
          >
            glycemic index (GI)
          </a>{" "}
          measures how quickly carbohydrates in food raise blood sugar levels
          after consumption. Foods with a lower GI, such as vegetables, nuts,
          and whole grains, cause a slower rise in blood sugar, promoting
          sustained energy and reducing insulin spikes. Pairing lower GI foods
          with healthy fats can further stabilize blood sugar and support{" "}
          <a
            href="https://en.wikipedia.org/wiki/Ketosis"
            target="_blank"
            rel="noopener noreferrer"
          >
            ketosis
          </a>
          , a metabolic state where the body burns fat for fuel instead of
          carbohydrates.
          <br />
          <br />
          Incorporating{" "}
          <a
            href="https://en.wikipedia.org/wiki/Alpha-Lipoic_acid"
            target="_blank"
            rel="noopener noreferrer"
          >
            alpha-lipoic acid (ALA)
          </a>{" "}
          and{" "}
          <a
            href="https://en.wikipedia.org/wiki/Conjugated_linoleic_acid"
            target="_blank"
            rel="noopener noreferrer"
          >
            conjugated linoleic acid (CLA)
          </a>{" "}
          into your diet can enhance metabolic health. ALA, a potent
          antioxidant, improves insulin sensitivity and helps reduce oxidative
          stress, while CLA supports fat metabolism and lean muscle retention.
          Adding fat to meals, such as avocado, nuts, or olive oil, can slow
          carbohydrate digestion, keeping blood sugar levels steady and
          encouraging the body to stay in ketosis.
          <br />
          <br />
          <a
            href="https://en.wikipedia.org/wiki/Green_tea"
            target="_blank"
            rel="noopener noreferrer"
          >
            Green tea extract
          </a>
          , rich in{" "}
          <a
            href="https://en.wikipedia.org/wiki/Epigallocatechin_gallate"
            target="_blank"
            rel="noopener noreferrer"
          >
            epigallocatechin gallate (EGCG)
          </a>
          , is another powerful addition to support metabolism and fat
          oxidation. EGCG is a natural antioxidant that enhances{" "}
          <a
            href="https://en.wikipedia.org/wiki/Thermogenesis"
            target="_blank"
            rel="noopener noreferrer"
          >
            thermogenesis
          </a>{" "}
          (the process of burning calories to produce heat), promotes fat
          breakdown, and improves insulin sensitivity. Incorporating green tea
          extract into your routine can complement other strategies for managing
          blood sugar and enhancing fat metabolism.
          <br />
          <br />
          Exercise after meals is also an effective strategy to lower blood
          sugar levels and improve insulin sensitivity. Physical activity
          utilizes glucose from the bloodstream, helping manage blood sugar more
          efficiently while boosting energy expenditure.
          <br />
          <br />
          Finally,{" "}
          <a
            href="https://en.wikipedia.org/wiki/Chromium"
            target="_blank"
            rel="noopener noreferrer"
          >
            chromium
          </a>
          , an essential trace mineral, plays a key role in enhancing the action
          of insulin, the hormone responsible for regulating blood sugar.
          Consuming foods rich in chromium, like broccoli, eggs, and whole
          grains, or taking a chromium supplement, may help improve glucose
          metabolism and support overall metabolic health.
        </p>
      </TabPanel>
      <TabPanel
        value={props.value}
        index={3}
        // @ts-ignore
        style={{
          width: "100vw", // Full viewport width
          marginTop: "200px", // Remove extra margins
          padding: "0", // Ensure no padding interferes
          position: "relative", // Ensure proper layout context
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          {["versus.energy", "cuizine"].map((title: any, index: any) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Box
                sx={{
                  cursor: "pointer",
                  width: "100%",
                  height: 300,
                  position: "relative",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  overflow: "hidden",
                  textAlign: "center",
                  backgroundImage: `url(${index == 0 ? versusLogo : null})`,
                  // backgroundSize: "cover",
                  // backgroundPosition: "center",
                }}
                onClick={() => {
                  if (index == 0) window.open("https://versus.energy");
                  else props.setCuizineViewing(true);
                }}
              >
                {index == 1 && (
                  <h1 style={{ fontFamily: "Gothic" }}>Cuizine</h1>
                )}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    py: 1,
                  }}
                >
                  {title}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel
        value={props.value}
        index={4}
        // @ts-ignore
        style={{
          minWidth: "800px", // Minimum width for the tab panel
          maxWidth: "100%", // Allows it to scale with the parent
          margin: "0 auto", // Centers the panel horizontally
          padding: "20px", // Adds padding for readability
          boxSizing: "border-box", // Includes padding in width calculations
        }}
      >
        <JSONWidget />
      </TabPanel>
    </Box>
  );
};

export default NavBar;
