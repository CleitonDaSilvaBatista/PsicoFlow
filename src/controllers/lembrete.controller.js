const s=require('../services/lembrete.service'); const h=fn=>async(req,res)=>{try{const r=await fn(req);res.status(req.method==='POST'?201:200).json(r)}catch(e){res.status(400).json({error:e.message})}};
exports.criar=h(req=>s.criar(req.body)); exports.listar=h(req=>s.listar(req.user)); exports.atualizar=h(req=>s.atualizar(req.params.id,req.body)); exports.gerar=h(()=>s.gerarAutomaticos());
