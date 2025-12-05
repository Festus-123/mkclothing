import Logs from '../models/Logs.js';

export const getLogs = async (req, res) => {
  try {
    const logs = await Logs.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'fetching logs', logs });
  } catch (error) {
    res.status(500).json({ message: 'failed to fetch logs' });
  }
};
