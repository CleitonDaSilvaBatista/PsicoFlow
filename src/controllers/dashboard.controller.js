const dashboardService = require('../services/dashboard.service');

exports.resumo = async (req, res) => {
  try {
    const resumo = await dashboardService.resumoDashboard(req.user);
    res.json(resumo);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};