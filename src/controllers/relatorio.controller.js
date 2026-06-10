const relatorioService = require('../services/relatorio.service');
async function responder(res, fn) { try { res.json(await fn()); } catch (error) { res.status(500).json({ error: error.message }); } }
exports.financeiro = async (req, res) => responder(res, relatorioService.financeiro);
exports.operacional = async (req, res) => responder(res, relatorioService.operacional);
exports.clinico = async (req, res) => responder(res, relatorioService.clinico);
exports.completo = async (req, res) => responder(res, relatorioService.completo);
