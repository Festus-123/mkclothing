// product controller
import Products from '../models/Products.js';
import Logs from '../models/Logs.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'success', products });
  } catch (error) {
    res.status(500).json({ message: `failed: ${error.message}` });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json({ message: 'success', product });
  } catch (error) {
    res.status(500).json({ message: `failed: ${error.message}` });
  }
};

export const addProducts = async (req, res) => {
  try {
    // console.log('BODY:', req.body);
    // console.log('FILES:', req.files);

    const imageUrls = req.files.map((file) => file.path);

    const product = await Products.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category || 'Men',
      price: req.body.price,
      oldPrice: req.body.oldPrice || null,
      quantity: req.body.quantity || 0,
      sizes: req.body.sizes || '',
      images: imageUrls,
    });

    console.log(product);

    await Logs.create({
      action: 'ADDED_PRODUCT',
      description: `Product ${product.name} was added`,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    await Log.create({
      action: 'UPDATED_PRODUCT',
      description: `Product ${product.name} was updated`,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'success', product });
  } catch (error) {
    res.status(500).json({ message: `failed: ${error.message}` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete();

    await Log.create({
      action: 'DELETED_PRODUCT',
      description: `Product ${product.name} was deleted`,
      createdAt: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: `failed: ${error.message}` });
  }
};
