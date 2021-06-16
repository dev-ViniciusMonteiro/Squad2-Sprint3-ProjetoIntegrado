const database =  require('../models')
import {Request,Response} from 'express'

class TipoController {
    async listarTipos(req:Request,res:Response){
        try{
            const tipos = await database.Tipo.findAll()
            return res.status(200).json(tipos)
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar os tipos!"})
        }
    }
    async listarTipo(req:Request,res:Response){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            return res.status(200).json(tipo)
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel listar o tipo desejado!"})
        }
    }
    async inserirTipo(req:Request,res:Response){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.create(req.body)
            return res.status(201).json(tipo)
            }else{
                throw new Error ("Desculpe, mas nao foi possivel inserir um novo tipo!")
            } 
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel inserir um novo tipo!"})
        }
    }
    async atualizarTipo(req:Request,res:Response){
        try{
            if(req.is('json')){
                const tipo = await database.Tipo.findByPk(req.params.id)
                await tipo.update(req.body)
                res.status(200).json(tipo)
            }else{
                throw new Error("Desculpe, mas nao foi possivel atualizar o tipo desejado!")
            }
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel atualizar o tipo desejado!"})
        }

    }
    async deletarTipo(req:Request,res:Response){
        try{
            const tipo = await database.Tipo.findByPk(req.params.id)
            await tipo.destroy(req.body)
            return res.status(200).json({msg:"Tipo deletado com sucesso!"})
        }catch(error){
            return res.status(400).json({erro:"Desculpe, mas nao foi possivel deletar!"})
        }

    }
}

export default new TipoController()
/*
function trataTipos(arr){
    let tipo = [];
    for(i = 0 ; i < arr.length ; i++){
        tipo.push({id:arr[i].id, categoria:arr[i].categoria})
    }
    return tipo
}
function tipo{ 
    return {id:tipo.id, categoria:tipo.categoria}
}*/