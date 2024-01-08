const SalesModel = require('../Models/SalesModel');


    exports.getTotalRevenue= async (req, res) => {
      try {
        const totalRevenue = await SalesModel.aggregate([{ $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$price'] } } } }]);
        res.json({ totalRevenue: totalRevenue[0].total });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    exports.getQuantityByProduct= async (req, res) => {
      try {
        const quantityByProduct = await SalesModel.aggregate([
          { $group: { _id: '$product', totalQuantity: { $sum: '$quantity' } } },
        ]);
        res.json(quantityByProduct);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    exports.getTopProducts= async (req, res) => {
      try {
        const topProducts = await SalesModel.aggregate([
          { $group: { _id: '$product', totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } } } },
          { $sort: { totalRevenue: -1 } },
          { $limit: 5 },
        ]);
        res.json(topProducts);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    exports.getAveragePrice= async (req, res) => {
      try {
        const averagePrice = await SalesModel.aggregate([{ $group: { _id: null, average: { $avg: '$price' } } }]);
        res.json({ averagePrice: averagePrice[0].average });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    exports.getRevenueByMonth= async (req, res) => {
      try {
        const revenueByMonth = await SalesModel.aggregate([
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
              totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
            },
          },
        ]);
        res.json(revenueByMonth);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    exports.getHighestQuantitySold= async (req, res) => {
      try {
        const highestQuantitySold = await SalesModel.findOne({}).sort('-quantity');
        res.json(highestQuantitySold);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    
  
