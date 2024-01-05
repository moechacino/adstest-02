const Products = require("../models/Products");
const Categories = require("../models/Categories");
const ProductAssets = require("../models/ProductAssets");
const { BadRequestError } = require("../errors");
const { Op } = require("sequelize");

const createSlug = async (val) => {
  let slug = val
    .toString()
    .toLowerCase()
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .replace(/\s+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/[^\w\-]+/g, "");
  const existingProduct = await Products.findOne({ where: { slug } });
  let counter = 1;

  if (!(existingProduct.length === 0)) {
    const similarSlugs = await Products.findAll({
      where: {
        slug: {
          [Op.like]: `${slug}%`,
        },
      },
      attributes: ["slug"],
    });
    if (similarSlugs.length > 1) {
      const splitedArr = similarSlugs[similarSlugs.length - 1].slug.split("-");

      counter = parseInt(splitedArr[splitedArr.length - 1]);
      counter++;
      slug = `${slug}-${counter}`;
    } else {
      slug = `${slug}-${counter}`;
    }
  }
  return slug;
};

const createProduct = async (req, res) => {
  const { name, categoryName } = req.body;
  let { price } = req.body;
  if (!name || !price || !categoryName) {
    throw new BadRequestError("lengkapi data");
  }
  if (isNaN(price)) {
    throw new BadRequestError("Harga harus berupa angka");
  }
  const category = await Categories.findOne({ where: { name: categoryName } });
  if (!category) {
    throw new BadRequestError("Kategori tidak ditemukan");
  }
  const slug = await createSlug(name);

  const newProduct = await Products.create({
    name: name,
    slug: slug,
    price: parseInt(price),
    Category_id: category.id,
  });
  res.status(200).json({ success: true, newProduct });
};

const editProduct = async (req, res) => {
  const { name, price, categoryName } = req.body;
  if (!name || !price || !categoryName) {
    throw new BadRequestError("lengkapi data");
  }
  if (isNaN(price)) {
    throw new BadRequestError("Harga harus berupa angka");
  }
  const id = parseInt(req.params.id);
  const product = await Products.findByPk(id);
  if (!product) {
    throw new BadRequestError("Produk tidak ditemukan");
  }
  const category = await Categories.findOne({ where: { name: categoryName } });
  if (!category) {
    throw new BadRequestError("Kategori tidak ditemukan");
  }
  const slug = await createSlug(name);
  const updatedProduct = await product.update({
    name: name,
    slug: slug,
    price: parseInt(price),
    Category_id: category.id,
  });
  res.status(200).json({ success: true, updatedProduct });
};

const deleteOneProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await Products.findByPk(id);
  if (!product) {
    throw new BadRequestError("Produk tidak ditemukan");
  }
  await ProductAssets.destroy({
    where: {
      product_id: id,
    },
  });
  await product.destroy();

  res.status(200).json({ success: true, deletedProduct: product });
};

module.exports = { createProduct, editProduct, deleteOneProduct };
