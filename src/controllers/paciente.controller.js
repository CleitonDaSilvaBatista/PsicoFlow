const pacienteService = require('../services/paciente.service');

exports.criar = async (req, res) => {
  try {
    const paciente = await pacienteService.criarPaciente(req.body, req.user.id);
    res.status(201).json(paciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const pacientes = await pacienteService.listarPacientes(req.user);
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const paciente = await pacienteService.buscarPacientePorId(req.params.id, req.user);

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const paciente = await pacienteService.atualizarPaciente(req.params.id, req.body, req.user);
    res.json(paciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    await pacienteService.deletarPaciente(req.params.id, req.user);
    res.json({ mensagem: 'Paciente removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};