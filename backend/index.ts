import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load CV data
const cvDataPath = path.join(__dirname, "cv.json");

app.get("/api/cv", (req, res) => {
  try {
    const data = fs.readFileSync(cvDataPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading CV data:", error);
    res.status(500).json({ error: "Failed to load CV data" });
  }
});

// Update CV data (Mock storage)
app.post("/api/cv", (req, res) => {
  try {
    const newData = req.body;
    fs.writeFileSync(cvDataPath, JSON.stringify(newData, null, 2));
    res.json({ message: "CV data updated successfully", data: newData });
  } catch (error) {
    console.error("Error saving CV data:", error);
    res.status(500).json({ error: "Failed to save CV data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
