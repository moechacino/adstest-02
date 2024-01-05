const Products = require("../models/Products");
const Categories = require("../models/Categories");
const ProductAssets = require("../models/ProductAssets");
const { BadRequestError } = require("../errors");

const createAssets = async (req, res) => {
  const { productName, image } = req.body;
  if (!productName || !image) {
    throw new BadRequestError("Lengkapi data");
  }

  const product = await Products.findOne({
    where: {
      name: productName,
    },
  });
  if (!product) {
    throw new BadRequestError("Product tidak ditemukan");
  }

  const assets = await ProductAssets.create({
    product_id: product.id,
    image: image,
  });
  res.status(200).json({ success: true, assets });
};

module.exports = { createAssets };
