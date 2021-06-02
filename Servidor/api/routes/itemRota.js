const router = require('express').Router()
const itemController = require("../controllers/ItemController")

router.get("/listar",itemController.listarItens)
router.post('/inserir',itemController.inserirItem)
router.put('/atualizar/:id',itemController.atualizarItem)
router.delete("/deletar/:id",itemController.deletarItem)

module.exports = router
