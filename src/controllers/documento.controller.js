const service = require('../services/documento.service');
const handle = fn => async (req,res)=>{ try { const r = await fn(req); res.status(req.method==='POST'?201:200).json(r); } catch(e){ res.status(400).json({error:e.message}); } };
exports.criar = handle(req=>service.criar(req.body, req.user));
exports.listar = handle(req=>service.listar(req.user));
exports.buscar = handle(async req=>{ const r=await service.buscar(req.params.id, req.user); if(!r) throw new Error('Documento não encontrado'); return r; });
exports.atualizar = handle(req=>service.atualizar(req.params.id, req.body, req.user));
exports.remover = handle(req=>service.remover(req.params.id, req.user));
exports.gerarRecibo = handle(req=>service.gerarRecibo(req.body, req.user));
