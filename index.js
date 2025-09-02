import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ Create school
app.post("/api/schools/add", async (req, res) => {
  try {
    const { name, address, contact } = req.body;

    const school = await prisma.school.create({
      data: { name, address, contact },
    });

    res.json(school);
  } catch (err) {
    console.error("❌ Error creating school:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Read all schools
app.get("/api/schools", async (req, res) => {
  try {
    const schools = await prisma.school.findMany();
    res.json(schools);
  } catch (err) {
    console.error("❌ Error fetching schools:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Read single school
app.get("/api/schools/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const school = await prisma.school.findUnique({
      where: { id: parseInt(id) },
    });

    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }

    res.json(school);
  } catch (err) {
    console.error("❌ Error fetching school:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update school
app.put("/api/schools/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact } = req.body;

    const updatedSchool = await prisma.school.update({
      where: { id: parseInt(id) },
      data: { name, address, contact },
    });

    res.json(updatedSchool);
  } catch (err) {
    console.error("❌ Error updating school:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete school
app.delete("/api/schools/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.school.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "School deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting school:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
