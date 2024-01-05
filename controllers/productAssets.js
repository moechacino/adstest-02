const Products = require("../models/Products");
const Categories = require("../models/Categories");
const ProductAssets = require("../models/ProductAssets");
const { BadRequestError, CustomAPIError } = require("../errors");

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
    throw new CustomAPIError("Produk tidak ditemukan", 404);
  }

  const assets = await ProductAssets.create({
    product_id: product.id,
    image: image,
  });
  res.status(200).json({ success: true, assets });
};

const editAssets = async (req, res) => {
  const id = parseInt(req.params.id);
  const asset = await ProductAssets.findByPk(id);
  if (!asset) {
    throw new CustomAPIError("Asset tidak ditemukan", 404);
  }
  const { productId, image } = req.body;
  if (!productId || !image) {
    throw new BadRequestError("Lengkapi data");
  }
  const product = await Products.findByPk(parseInt(productId));
  if (!product) {
    throw new CustomAPIError("Produk tidak ditemukann", 404);
  }

  const updatedAsset = await asset.update({
    product_id: product.id,
    image: image,
  });

  res.status(200).json({ success: true, updatedAsset });
};

const deleteOneAssets = async (req, res) => {
  const id = parseInt(req.params.id);

  const asset = await ProductAssets.findByPk(id);
  if (!asset) {
    throw new CustomAPIError("Asset tidak ditemukan", 404);
  }
  await asset.destroy();
  res.status(200).json({ success: true, deletedAsset: asset });
};

const getAssets = async (req, res) => {
  const assets = await ProductAssets.findAll({
    include: [
      {
        model: Products,
        attributes: ["name"],
      },
    ],
  });

  res.status(200).json({ success: true, count: assets.length, data: assets });
};

module.exports = { createAssets, deleteOneAssets, editAssets, getAssets };
