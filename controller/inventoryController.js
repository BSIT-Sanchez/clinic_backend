import InventoryItem from "../models/InventoryItem.js";

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await InventoryItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get single item by id
export const getItem = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create new item
export const createItem = async (req, res) => {
  try {
    const { name, category, stock } = req.body;

    const status = stock === 0 ? "Out of Stock" : stock < 10 ? "Low Stock" : "In Stock";

    const newItem = new InventoryItem({ name, category, stock, status });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const { name, category, stock } = req.body;

    const status = stock === 0 ? "Out of Stock" : stock < 10 ? "Low Stock" : "In Stock";

    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { name, category, stock, status },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
