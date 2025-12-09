import express from  'express';
import {
    addProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getLogs
} from '../controllers/productController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router()


// get products all and particular 
router.get('/', protect, getProducts);
router.get('/:id', protect,  getProductById);

// ad products routes
router.post('/add', 
    protect, 
    upload.array('images', 10),
    addProducts);

// update product
router.put('/:id', protect,  updateProduct)

// delete products
router.delete('/:id', protect,  deleteProduct)

// get logs
router.get('/logs', protect,  getLogs)

export default router;
