import express from  'express';
import {
    addProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';
import protect from '../middlewares/authMiddleware.js';
import { upload } from '../utils/cloudinaryStorage.js';
const router = express.Router()


// get products all and particular 
router.get('/', protect, getProducts);
router.get('/:id', protect,  getProductById);

// ad products routes
router.post('/add', 
    protect, 
    upload.array('images'),
    addProducts);

// update product
router.put('/:id', protect,  updateProduct)

// delete products
router.delete('/:id', protect,  deleteProduct)

// get logs

export default router;
