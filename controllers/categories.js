const Products = require("../models/Products");
const Categories = require("../models/Categories");
const ProductAssets = require("../models/ProductAssets");
const { BadRequestError, CustomAPIError } = require("../errors");

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequestError("Nama tidak boleh kosong");
  }
  const newCategory = await Categories.create({
    name: name,
  });
  res.status(200).json({ success: true, newCategory });
};
const editCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const category = await Categories.findByPk(id);
  if (!category) {
    throw new CustomAPIError("kategori tidak ditemukna", 404);
  }
  const updatedCategory = await category.update({
    name: name,
  });
  res.status(200).json({ success: true, updatedCategory });
};

const deleteCategory = async (req, res) => {};

module.exports = { createCategory, editCategory, deleteCategory };
