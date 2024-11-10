// /routes/financeRoutes.js
const express = require("express");
const Finance = require("../models/Finance");
const router = express.Router();

// Create a new finance record
router.post("/", async (req, res) => {
  const { name, income, expenses, assets, liabilities, personalDetails } =
    req.body;

  try {
    const newFinance = new Finance({
      name,
      income,
      expenses,
      assets,
      liabilities,
      personalDetails,
    });
    await newFinance.save();
    res.status(201).json(newFinance);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create finance record", error: err });
  }
});

// Get all finance records
router.get("/", async (req, res) => {
  try {
    const finances = await Finance.find();
    res.status(200).json(finances);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch finance records", error: err });
  }
});

// Get a finance record by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const finance = await Finance.findById(id);
    if (!finance)
      return res.status(404).json({ message: "Finance record not found" });
    res.status(200).json(finance);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching finance record", error: err });
  }
});

// Update a finance record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, income, expenses, assets, liabilities, personalDetails } =
    req.body;

  try {
    const updatedFinance = await Finance.findByIdAndUpdate(
      id,
      {
        name,
        income,
        expenses,
        assets,
        liabilities,
        personalDetails,
      },
      { new: true }
    );

    if (!updatedFinance)
      return res.status(404).json({ message: "Finance record not found" });
    res.status(200).json(updatedFinance);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update finance record", error: err });
  }
});

// Delete a finance record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFinance = await Finance.findByIdAndDelete(id);
    if (!deletedFinance)
      return res.status(404).json({ message: "Finance record not found" });
    res.status(200).json({ message: "Finance record deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete finance record", error: err });
  }
});

module.exports = router;
