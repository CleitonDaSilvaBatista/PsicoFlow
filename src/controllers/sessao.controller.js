const sessaoService = require('../services/sessao.service');

exports.criar = async (req, res) => {
  try {
    const sessao = await sessaoService.criarSessao(req.body, req.user);
    res.status(201).json(sessao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const sessoes = await sessaoService.listarSessoes(req.user);
    res.json(sessoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const sessao = await sessaoService.buscarSessaoPorId(req.params.id, req.user);

    if (!sessao) {
      return res.status(404).json({ error: 'Sessão não encontrada' });
    }

    res.json(sessao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const sessao = await sessaoService.atualizarSessao(req.params.id, req.body, req.user);
    res.json(sessao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    await sessaoService.deletarSessao(req.params.id, req.user);
    res.json({ mensagem: 'Sessão removida com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};