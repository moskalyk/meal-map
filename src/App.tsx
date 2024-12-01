import { useState, useEffect } from "react";
import "./App.css";
import RecipeSearch from "./RecipeSearch";
// import Home from './Home'
import NavBar from "./NavBar";
import logo from "./assets/noun-plate.png";

function App() {
  const [value, setValue] = useState(0);

  const [recipeViewing, setRecipeViewing] = useState(null);
  const [cuizineViewing, setCuizineViewing] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("/recipes.json");
      const data = await res.json();
      setJsonData(data); // Update state with JSON data
    }, 0);
  }, []);

  return (
    <>
      {!cuizineViewing && !recipeViewing && (
        <img
          src={logo}
          alt="MealMap"
          style={{
            position: "fixed", // Fixes the position at the top
            top: "30px", // Adjusts the vertical position
            left: "50%", // Centers the logo horizontally
            transform: "translateX(-50%)", // Ensures perfect centering
            cursor: "pointer", // Adds a pointer cursor for interactivity
            maxWidth: "70px", // Limits the logo's width
            zIndex: 1000, // Ensures it stays above other elements
          }}
        />
      )}

      {!cuizineViewing && recipeViewing && (
        <div
          onClick={() => setRecipeViewing(null)}
          style={{
            position: "fixed",
            top: "30px",
            left: "50px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          <p>← Back to Recipes</p>
        </div>
      )}

      {!recipeViewing && cuizineViewing && (
        <div
          onClick={() => setCuizineViewing(null)}
          style={{
            position: "fixed",
            top: "30px",
            left: "50px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          <p>← Back to Tools</p>
        </div>
      )}

      {cuizineViewing && recipeViewing && (
        <div
          onClick={() => setRecipeViewing(null)}
          style={{
            position: "fixed",
            top: "30px",
            left: "50px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          <p>← Back to Cuizine</p>
        </div>
      )}

      {!recipeViewing && !cuizineViewing && jsonData && (
        <NavBar
          value={value}
          setValue={setValue}
          setCuizineViewing={setCuizineViewing}
          setRecipeViewing={setRecipeViewing}
          jsonData={jsonData}
        />
      )}
      {cuizineViewing && (
        <RecipeSearch setValue={setValue} setRecipeViewing={setRecipeViewing} />
      )}
      {recipeViewing && (
        <div
          style={{ padding: "20px", maxWidth: "800px", margin: "50px auto" }}
        >
          <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
              {/*@ts-ignore*/}

            {recipeViewing.title}
          </h1>
          <p style={{ fontStyle: "italic", color: "#555" }}>
              {/*@ts-ignore*/}
            {recipeViewing.description}
          </p>

          <h2 style={{ marginTop: "20px" }}>Ingredients</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {/* Left Column */}
            <ul
              style={{
                listStyle: "circle",
                textAlign: "left",
                paddingLeft: "20px",
                flex: "1",
              }}
            >
              {/*@ts-ignore*/}

              {recipeViewing.ingredients
                // @ts-ignore
                .slice(0, Math.ceil(recipeViewing.ingredients.length / 2))
                .map((ingredient: any, index: any) => (
                  <li key={index}>
                    {ingredient.quantity} x {ingredient.measurement} of{" "}
                    {ingredient.ingredient}
                  </li>
                ))}
            </ul>
            {/* Right Column */}
            <ul
              style={{
                listStyle: "circle",
                textAlign: "left",
                paddingLeft: "20px",
                flex: "1",
              }}
            >
              {/*@ts-ignore*/}

              {recipeViewing.ingredients
                // @ts-ignore
                .slice(Math.ceil(recipeViewing.ingredients.length / 2))
                .map((ingredient: any, index: any) => (
                  <li key={index}>
                    {ingredient.quantity} x {ingredient.measurement} of{" "}
                    {ingredient.ingredient}
                  </li>
                ))}
            </ul>
          </div>

          <h2 style={{ marginTop: "20px" }}>Steps</h2>
          <ol style={{ paddingLeft: "20px" }}>
              {/*@ts-ignore*/}
          
            {recipeViewing.steps.map((step: any, index: any) => (
              <li
                key={index}
                style={{ textAlign: "left", marginBottom: "10px" }}
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
      <br />
      <br />
    </>
  );
}

export default App;
