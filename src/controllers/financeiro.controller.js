const financeiroService = require('../services/financeiro.service');

function handleError(res, error) {
  return res.status(400).json({ error: error.message });
}

exports.resumo = async (req, res) => {
  try {
    res.json(await financeiroService.resumo(req.user));
  } catch (error) {
    handleError(res, error);
  }
};

exports.criarReceita = async (req, res) => {
  try {
    res.status(201).json(await financeiroService.criarReceita(req.body));
  } catch (error) {
    handleError(res, error);
  }
};

exports.listarReceitas = async (req, res) => {
  try {
    res.json(await financeiroService.listarReceitas(req.user));
  } catch (error) {
    handleError(res, error);
  }
};

exports.buscarReceitaPorId = async (req, res) => {
  try {
    const receita = await financeiroService.buscarReceitaPorId(req.params.id);
    if (!receita) return res.status(404).json({ error: 'Receita não encontrada.' });
    res.json(receita);
  } catch (error) {
    handleError(res, error);
  }
};

exports.atualizarReceita = async (req, res) => {
  try {
    res.json(await financeiroService.atualizarReceita(req.params.id, req.body));
  } catch (error) {
    handleError(res, error);
  }
};

exports.deletarReceita = async (req, res) => {
  try {
    await financeiroService.deletarReceita(req.params.id);
    res.json({ mensagem: 'Receita removida com sucesso.' });
  } catch (error) {
    handleError(res, error);
  }
};

exports.criarDespesa = async (req, res) => {
  try {
    res.status(201).json(await financeiroService.criarDespesa(req.body));
  } catch (error) {
    handleError(res, error);
  }
};

exports.listarDespesas = async (req, res) => {
  try {
    res.json(await financeiroService.listarDespesas());
  } catch (error) {
    handleError(res, error);
  }
};

exports.buscarDespesaPorId = async (req, res) => {
  try {
    const despesa = await financeiroService.buscarDespesaPorId(req.params.id);
    if (!despesa) return res.status(404).json({ error: 'Despesa não encontrada.' });
    res.json(despesa);
  } catch (error) {
    handleError(res, error);
  }
};

exports.atualizarDespesa = async (req, res) => {
  try {
    res.json(await financeiroService.atualizarDespesa(req.params.id, req.body));
  } catch (error) {
    handleError(res, error);
  }
};

exports.deletarDespesa = async (req, res) => {
  try {
    await financeiroService.deletarDespesa(req.params.id);
    res.json({ mensagem: 'Despesa removida com sucesso.' });
  } catch (error) {
    handleError(res, error);
  }
};
