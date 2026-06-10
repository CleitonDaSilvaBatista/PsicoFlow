const prontuarioService = require('../services/prontuario.service');

exports.criar = async (req, res) => {
  try {
    const prontuario = await prontuarioService.criarProntuario(req.body);
    res.status(201).json(prontuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const prontuarios = await prontuarioService.listarProntuarios(req.user);
    res.json(prontuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const prontuario = await prontuarioService.buscarProntuarioPorId(req.params.id, req.user);

    if (!prontuario) {
      return res.status(404).json({ error: 'Prontuário não encontrado' });
    }

    res.json(prontuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const prontuario = await prontuarioService.atualizarProntuario(req.params.id, req.body, req.user);
    res.json(prontuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    await prontuarioService.deletarProntuario(req.params.id, req.user);
    res.json({ mensagem: 'Prontuário removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};