// /models/Finance.js
const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    assets: { type: Number, required: true },
    liabilities: { type: Number, required: true },
    personalDetails: { type: String, required: true },
  },
  { timestamps: true }
);

const Finance = mongoose.model("Finance", financeSchema);
module.exports = Finance;
