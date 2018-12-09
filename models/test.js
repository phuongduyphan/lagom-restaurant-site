const { Dish } = require('./dish/Dish');
const { User } = require('./user/User');

async function runTest() {
  const user = new User();
  user.userFullName = 'Quynh Nguyen';
  user.userPhoneNumber = '123456789';
  user.reservations = {
    arrivalDate: new Date(),
    arrivalTime: new Date(),
    partySize: 2,
  };

  const graph = await User.query().insertGraph(user);
  console.log(graph.reservations.arrivalTime.getTime());
}

runTest().then(() => {});

// const express = require('express');
// const multer = require('multer');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './public/images/dishes');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({
//   storage: multerStorage,
//   limits: 5 * 1024 * 1024
// });

// const DishController = require('../src/dish/DishController');

// const router = express.Router();

// router.get('/', DishController.dish_get);
// router.post('/', upload.single('dishImage'), DishController.dish_post);
// router.put('/:dishId', upload.single('dishImage'), DishController.dish_put);

// module.exports = router;
