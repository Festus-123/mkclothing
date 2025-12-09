import Analytics from '../models/Analytics.js';

export const getAnalytics = async (req, res) => {
  try {
    let analytics = await Analytics.findOne();

    const date = new Date();

    if (!analytics) {
      analytics = await Analytics.create({
        users: 0,
        products: 0,
        interactions: [
          { date: "Nov, 11", favorites: 0, orders: 1},
          { date: "Nov, 12", favorites: 12, orders: 5},
          { date: "Nov, 13", favorites: 15, orders: 24},
          { date: "Nov, 14", favorites: 6, orders: 14},
        ],
        reviews: [
          { stars: 5, count: 10, },
          { stars: 4, count: 12, },
          { stars: 3, count: 16, },
          { stars: 2, count: 10, },
          { stars: 1, count: 5, },
        ],
      });
    }
    return res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
