const db = require('../../config/mysql-config');
const queryStatement = require('./OrderSqlStatements');

module.exports = {
  async order_post(req, res) {
    const { order } = req.body;
    try {
      const connection = await db.getConnection();

      try {
        await connection.beginTransaction();
        const userDb = db.getDbObject(order, db.category.user);
        const resultUserQuery = await connection.query(queryStatement.insertQuery, ['user', userDb]);
        const userId = resultUserQuery.insertId;
        const resultOrderQuery = await connection.query(queryStatement.insertQuery,['order', { user_id: userId }]);
        const orderId = resultOrderQuery.insertId;
        for (let i = 0; i < order.listOfDishes.length; i++) {
          const orderContains = {
            orderId,
            dishId: order.listOfDishes[i].dishId
          };
          const orderContainsDb = db.getDbObject(orderContains, db.category.orderContains);
          await connection.query(queryStatement.insertQuery, ['order_contains', orderContainsDb]);
        };
        await connection.commit();
        res.sendStatus(200);
      } catch (err) {
        connection.rollback();
        throw err;
      }
    } catch (err) {
      throw err;
    }
  },
	async order_get(req, res) {
		const { orderId } = req.params;
		try {
      const connection = await db.getConnection();
      const orderUserInfoPacket = await connection.query(queryStatement.selectOrderWithUser, orderId);
      const orderDishesInfoPacket = await connection.query(queryStatement.selectOrderWithDishes, orderId);

      const orderUserInfoDb = (JSON.parse(JSON.stringify(orderUserInfoPacket)))[0];
      const listOfOrderDishesInfoDb = JSON.parse(JSON.stringify(orderDishesInfoPacket));
      
      const userInfo = db.getAPIObject(orderUserInfoDb, db.category.user);
      const orderInfo = db.getAPIObject(orderUserInfoDb, db.category.order);
      const listOfOrderDishesInfo = listOfOrderDishesInfoDb.map((element) => {
        return db.getAPIObject(element, db.category.dish);
      });
     
      const returnedData = {
        userInfo,
        orderInfo,
        listOfOrderDishesInfo
      };
      res.send(returnedData);
		} catch (err) {
     throw err;
    }
  },
  async order_status_put(req, res) {
    const { orderId } = req.params;
    const { order } = req.body;
    try {
      const connection = await db.getConnection();
      const orderDb = db.getDbObject(order, db.category.order);
      await connection.query(queryStatement.updateOrderStatus, [orderDb, orderId]);
      res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },	
};
