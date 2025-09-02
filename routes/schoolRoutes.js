import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ➕ Create School
router.post("/add", async (req, res) => {
  try {
    const school = await prisma.school.create({
      data: req.body,
    });
    res.json({ success: true, data: school });
  } catch (err) {
    console.error("❌ Error adding school:", err);
    res.status(500).json({ success: false, error: "Failed to add school" });
  }
});

// 📋 Get All Schools
router.get("/", async (req, res) => {
  try {
    const schools = await prisma.school.findMany();
    res.json({ success: true, data: schools });
  } catch (err) {
    console.error("❌ Error fetching schools:", err);
    res.status(500).json({ success: false, error: "Failed to fetch schools" });
  }
});

// ✏️ Update School
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.school.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("❌ Error updating school:", err);
    res.status(500).json({ success: false, error: "Failed to update school" });
  }
});

// ❌ Delete School
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.school.delete({
      where: { id: parseInt(id) },
    });
    res.json({ success: true, message: "School deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting school:", err);
    res.status(500).json({ success: false, error: "Failed to delete school" });
  }
});

export default router;
