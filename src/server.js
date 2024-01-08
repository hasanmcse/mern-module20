const  SalesModel = require('../Models/SalesModel');

// Define API endpoints
app.get('/api/sales/total-revenue', async (req, res) => {
    try {
      const totalRevenue = await Sale.aggregate([{ $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$price'] } } } }]);
      res.json({ totalRevenue: totalRevenue[0].total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/api/sales/quantity-by-product', async (req, res) => {
    try {
      const quantityByProduct = await Sale.aggregate([{ $group: { _id: '$product', totalQuantity: { $sum: '$quantity' } } }]);
      res.json(quantityByProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });