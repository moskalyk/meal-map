import React, { useState } from "react";
import ReactJson from "react-json-view";

const CodeWithCopyButton = () => {
    const code = `
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    ingredient: {
        type: String,
        required: true,
    },
    measurement: {
        type: String,
        required: true,
        enum: ['g', 'ml', 'pcs', 'tbsp', 'tsp'], // Example measurement units
    },
});

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [ingredientSchema], // Embedded schema for ingredients
        required: true,
        validate: [(val) => val.length > 0, 'At least one ingredient is required.'],
    },
    steps: {
        type: [String],
        required: true,
        validate: [(val) => val.length > 0, 'At least one step is required.'],
    },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Recipe', recipeSchema);
    `;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
            .then(() => alert("Code copied to clipboard!"))
            .catch((err) => console.error("Failed to copy code: ", err));
    };

    return (
        <div style={{ margin: "20px", fontFamily: "monospace" }}>
            <pre
                style={{
                    textAlign: 'left',
                    padding: "15px",
                    backgroundColor: "#f4f4f4",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    overflowX: "auto",
                }}
            >
                <code>{code}</code>
            </pre>
            <button
                onClick={copyToClipboard}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Copy Code
            </button>
        </div>
    );
};

const JsonWidget = () => {
    const [jsonData, setJsonData] = useState(null);

    // Example data generation function
    const generateData = async () => {
        const res = await fetch('/recipes.json')
        const data = await res.json()
        setJsonData(data); // Update state with generated JSON data
    };

    return (
        <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
            <br/>
            <br/>
            <br/>
            <h2>Recipe Viewer</h2>
            <p>
                <code>const recipes = await (await fetch('{`${window.location}`}recipes.json')).json()</code>
            </p>
            <button
                onClick={generateData}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    marginBottom: "20px",
                    cursor: "pointer",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                }}
            >
                Generate JSON Data
            </button>
            {jsonData && (
                <ReactJson
                    src={jsonData}
                    name="RecipeData"
                    theme="monokai"
                    displayDataTypes={false} // Hides data type labels
                    collapsed={false} // Data is expanded by default
                    style={{ textAlign: 'left', border: "1px solid #ddd", borderRadius: "5px", padding: "1px" }}
                />
            )}
            <h2>Mongoose Schema</h2>
            <CodeWithCopyButton/>
        </div>
    );
};

export default JsonWidget;
