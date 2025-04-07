
import React, { useState, useEffect } from "react";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("./public/recipes.json")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    ingredients.split(",").some(ing =>
      recipe.ingredients.some(ri => ri.toLowerCase().includes(ing.trim().toLowerCase()))
    )
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>MealMuse 🍽️ (Live Test)</h1>
      <p>App is running. If you're reading this, React rendered successfully.</p>
      <input
        type="text"
        placeholder="Enter ingredients..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{ width: "100%", padding: "1rem", marginBottom: "1rem" }}
      />
      {filteredRecipes.map((recipe, i) => (
        <div key={i} style={{ marginBottom: "1.5rem" }}>
          <h2>{recipe.name}</h2>
          <p><strong>Nutrition:</strong> {recipe.nutrition}</p>
          <ul>{recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export default App;
