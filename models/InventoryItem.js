import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { 
  type: String, 
  enum: ["Medicines", "Supplies", "Equipment", "Consumables", "Accessories"], 
  default: "Supplies" 
},

    stock: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  { timestamps: true }
);

export default mongoose.model("InventoryItem", inventoryItemSchema);
