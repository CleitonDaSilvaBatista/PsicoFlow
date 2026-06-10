const convenioService = require('../services/convenio.service');
function erro(res, error) { return res.status(400).json({ error: error.message }); }
exports.criar = async (req, res) => { try { res.status(201).json(await convenioService.criarConvenio(req.body)); } catch (error) { erro(res, error); } };
exports.listar = async (req, res) => { try { res.json(await convenioService.listarConvenios()); } catch (error) { erro(res, error); } };
exports.buscarPorId = async (req, res) => { try { const item = await convenioService.buscarConvenioPorId(req.params.id); if (!item) return res.status(404).json({ error: 'Convênio não encontrado.' }); res.json(item); } catch (error) { erro(res, error); } };
exports.atualizar = async (req, res) => { try { res.json(await convenioService.atualizarConvenio(req.params.id, req.body)); } catch (error) { erro(res, error); } };
exports.deletar = async (req, res) => { try { await convenioService.deletarConvenio(req.params.id); res.json({ mensagem: 'Convênio removido com sucesso.' }); } catch (error) { erro(res, error); } };
exports.vincularPaciente = async (req, res) => { try { res.json(await convenioService.vincularPaciente(req.body)); } catch (error) { erro(res, error); } };
