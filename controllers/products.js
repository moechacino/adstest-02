const Products = require("../models/Products");
const Categories = require("../models/Categories");
const ProductAssets = require("../models/ProductAssets");
const { BadRequestError, CustomAPIError } = require("../errors");
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
  console.log(existingProduct);
  if (existingProduct) {
    const similarSlugs = await Products.findAll({
      where: {
        slug: {
          [Op.like]: `${slug}%`,
        },
      },
      attributes: ["slug"],
    });

    if (similarSlugs) {
      if (similarSlugs.length > 1) {
        const splitedArr =
          similarSlugs[similarSlugs.length - 1].slug.split("-");

        counter = parseInt(splitedArr[splitedArr.length - 1]);
        counter++;
        slug = `${slug}-${counter}`;
      } else {
        slug = `${slug}-${counter}`;
      }
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
    throw new CustomAPIError("Kategori tidak ditemukan", 404);
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
  const id = parseInt(req.params.id);
  const product = await Products.findByPk(id);
  if (!product) {
    throw new CustomAPIError("Produk tidak ditemukan", 404);
  }
  const { name, price, categoryName } = req.body;
  if (!name || !price || !categoryName) {
    throw new BadRequestError("lengkapi data");
  }
  if (isNaN(price)) {
    throw new BadRequestError("Harga harus berupa angka");
  }

  const category = await Categories.findOne({ where: { name: categoryName } });
  if (!category) {
    throw new CustomAPIError("Kategori tidak ditemukan", 404);
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
    throw new CustomAPIError("Produk tidak ditemukan", 404);
  }
  await product.destroy();

  res.status(200).json({ success: true, deletedProduct: product });
};

const getProducts = async (req, res) => {
  const { priceSorting } = req.query;
  const products = await Products.findAll({
    attributes: [
      ["id", "product_id"],
      ["name", "product_name"],
      ["slug", "slug"],
      ["price", "price"],
    ],
    include: [
      {
        model: Categories,
        attributes: ["name"],
      },
    ],
  });
  const assets = await ProductAssets.findAll();
  products.forEach((product) => {
    const productAssets = assets.filter(
      (asset) => asset.product_id === product.dataValues.product_id
    );
    product.dataValues.assets = productAssets.map((asset) => ({
      asset_id: asset.id,
      image: asset.image,
    }));
  });
  let sortedProducts = [...products];

  if (priceSorting) {
    if (priceSorting === "tertinggi") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (priceSorting === "terendah") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      throw new BadRequestError("Sorting harga tidak valid");
    }
  }

  res.status(200).json(sortedProducts);
};

module.exports = { createProduct, editProduct, deleteOneProduct, getProducts };
