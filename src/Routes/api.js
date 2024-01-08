const express = require('express');

const SalesController = require("../Controllers/SalesController")


const router = express.Router();

router.get('/total-revenue', SalesController.getTotalRevenue);
router.get('/quantity-by-product', SalesController.getQuantityByProduct);
router.get('/top-products', SalesController.getTopProducts);
router.get('/average-price', SalesController.getAveragePrice);
router.get('/revenue-by-month', SalesController.getRevenueByMonth);
router.get('/highest-quantity-sold', SalesController.getHighestQuantitySold);
router.get('/department-salary-expense', SalesController.getDepartmentSalaryExpense);

module.exports = router;
