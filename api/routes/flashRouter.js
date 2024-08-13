const multer = require('multer')
const storage = multer.diskStorage({
   destination: (req, res, cb) => {
      cb(null, 'db/swf/');
   },
   filename: (req, res, cb) =>{
      let fileName = res.originalname;
      cb(null, fileName);
   }
})

const upload = multer({
   storage: storage
})

const router = (app) => {
   const flashController = require('../controllers/flashController')


   app.route('/games')
      .get(flashController.view_all_flash_games)
      .post(flashController.add_flash_game)
      .delete(flashController.delete_all_flash_games)

   app.route('/games/:id')
      .get(flashController.view_a_flash_game)
      .put(flashController.update_flash_game)
      .delete(flashController.delete_a_flash_game)

   
   app.post("/upload", upload.single('file'), (req, res) => {
      res.json({file: req.file})
   })

   app.route('/download/:id').get(flashController.download_flash_game)
   app.route('/play/:id').get(flashController.play_flash_game)
}

module.exports = router