import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct,
    deleteProduct, SoldOut, sellingProducts, listProductsBy} from "./products.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Error creating product
 */
router.post("/addProduct", validateJWT, createProduct);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Error getting products
 */
router.get("/", validateJWT, getProducts);

/**
 * @swagger
 * /getProductById/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error getting product
 */
router.get("/getProductById/:id", validateJWT, getProductById);

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating product
 */
router.put("/updateProduct/:id", validateJWT, updateProduct);

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting product
 */
router.delete("/deleteProduct/:id", validateJWT, deleteProduct);

/**
 * @swagger
 * /SoldOut:
 *   get:
 *     summary: Get all sold out products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sold out products
 *       500:
 *         description: Error getting sold out products
 */
router.get("/SoldOut", validateJWT, SoldOut);

/**
 * @swagger
 * /sellingProducts:
 *   get:
 *     summary: Get all selling products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of selling products
 *       500:
 *         description: Error getting selling products
 */
router.get("/sellingProducts", validateJWT, sellingProducts);

/**
 * @swagger
 * /listProductsBy:
 *   get:
 *     summary: List products by filter
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: FiltrarPor
 *         schema:
 *           type: string
 *         required: true
 *         description: Filter criteria (e.g., MasVendidos, category name, product name)
 *     responses:
 *       200:
 *         description: List of filtered products
 *       400:
 *         description: Filter criteria not provided
 *       404:
 *         description: No products found with the given criteria
 *       500:
 *         description: Error listing products
 */
router.get("/listProductsBy", validateJWT, listProductsBy);