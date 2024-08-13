const mongoose = require('mongoose')
const flashSchema = mongoose.Schema(
   {
      title: {
         type: String,
         required: "Game Title cannot be empty"
      },
      description: {
         type: String,
         required: "Game Description cannot be empty"
      },
      swf_file: {
         type: String,
         required: "Game Directory cannot be empty"
      }
   },
   {
      versionKey: false  //ignore version key for new data
   }
)
const flashModel = mongoose.model('flash_games', flashSchema)     //flash_games: collection (table) name
module.exports = flashModel