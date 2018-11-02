const express = require('express');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/dishes');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({
  storage: multerStorage,
  limits: 5 * 1024 * 1024
});

const DishController = require('../src/dish/DishController');

const router = express.Router();

router.get('/', DishController.dish_get);
router.post('/', upload.single('dishImage'), DishController.dish_post);
router.put('/:dishId', upload.single('dishImage'), DishController.dish_put);

module.exports = router;
