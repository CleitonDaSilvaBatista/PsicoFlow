
const auth = require('../services/auth.service');

exports.register = async (req,res)=>{
 try{ const user = await auth.register(req.body); res.status(201).json(user); }
 catch(e){ res.status(400).json({error:e.message}); }
};

exports.login = async (req,res)=>{
 try{ const result = await auth.login(req.body.email, req.body.senha); res.json(result); }
 catch(e){ res.status(401).json({error:e.message}); }
};
