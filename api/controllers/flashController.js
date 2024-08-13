const path = require('path')
const flashModel = require('../models/flashModel')
const fs = require('fs')

exports.view_all_flash_games = async (req, res) => {
   try {
      flash_games = await flashModel.find({})
      res.json(flash_games)
   } catch (err) {
      res.send(err)
   }
}

exports.view_a_flash_game = async (req, res) => {
   try {
      id = req.params.id
      flash_game = await flashModel.findById(id)
      res.json(flash_game)
   } catch (err) {
      res.send(err)
   }
}

exports.delete_a_flash_game = async (req, res) => {
   try {
      id = req.params.id
      await flashModel.findByIdAndDelete(id)
      res.json({ message : "Delete a flash_game succeed !"})
   } catch (err) {
      res.send(err)
   }
}

exports.delete_all_flash_games = async (req, res) => {
   try {
      await flashModel.deleteMany()
      res.json({ message: "Delete all flash_games succeed !" })
   } catch (err) {
      res.send(err)
   }
}

exports.add_flash_game = async (req, res) => {
   try {
      flash_game = req.body
      await flashModel.create(flash_game)
      res.json({ message: "Add new flash_game succeed !" })
   } catch (err) {
      res.send(err)
   }
}

exports.update_flash_game = async (req, res) => {
   try {
      id = req.params.id
      flash_game = req.body
      await flashModel.findByIdAndUpdate(id, flash_game)
      res.json({ message: "Update flash_game succeed !" })
   } catch (err) {
      res.send(err)
   }
}

exports.download_flash_game = async (req, res) => {
   try {
      id = req.params.id
      flash_game = await flashModel.findById(id)
      const file = 'db/swf/' + flash_game.swf_file;
      const data = fs.readFileSync(file, 'utf-8');

      res.download(file,  (error) => {
         if(error){
            console.log(error)
            if(res.headersSent){
               console.log(error)
            } else {
               return res.sendStatus(404)
            }
         } else{
            console.log('Y U NO DOWNLOAD?')
         }
      })
   } catch (err) {
      res.send(err)
   }
}

exports.play_flash_game = async (req, res) =>{
   try {
      id = req.params.id
      flash_game = await flashModel.findById(id)
      
      const file = 'db/swf/'+flash_game.swf_file

      const html = '<embed src="'+ file + '" width="600" height="480"></embed><script src="https://unpkg.com/@ruffle-rs/ruffle"></script>'
      res.send(html)
   } catch (err) {
      res.send(err)
   }
}
