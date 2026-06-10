const planoService = require('../services/plano.service');

function erro(res, error) {
  return res.status(400).json({ error: error.message });
}

exports.criar = async (req, res) => {
  try { res.status(201).json(await planoService.criarPlano(req.body)); } catch (error) { erro(res, error); }
};
exports.listar = async (req, res) => {
  try { res.json(await planoService.listarPlanos()); } catch (error) { erro(res, error); }
};
exports.buscarPorId = async (req, res) => {
  try {
    const plano = await planoService.buscarPlanoPorId(req.params.id);
    if (!plano) return res.status(404).json({ error: 'Plano não encontrado.' });
    res.json(plano);
  } catch (error) { erro(res, error); }
};
exports.atualizar = async (req, res) => {
  try { res.json(await planoService.atualizarPlano(req.params.id, req.body)); } catch (error) { erro(res, error); }
};
exports.deletar = async (req, res) => {
  try { await planoService.deletarPlano(req.params.id); res.json({ mensagem: 'Plano removido com sucesso.' }); } catch (error) { erro(res, error); }
};
exports.atribuir = async (req, res) => {
  try { res.status(201).json(await planoService.atribuirPlanoAoPaciente(req.body)); } catch (error) { erro(res, error); }
};
exports.consumirSessao = async (req, res) => {
  try { res.json(await planoService.consumirSessaoPlano(req.params.id)); } catch (error) { erro(res, error); }
};
exports.listarPlanosPacientes = async (req, res) => {
  try { res.json(await planoService.listarPlanosPacientes()); } catch (error) { erro(res, error); }
};
