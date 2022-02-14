const router = require('express').Router();

router.get('/',(req,res)=>{
    res.status(200).json({message: "Conexão ok com server"});
})

module.exports = router;