module.exports = {
  insertQuery: 'INSERT INTO ?? SET ?',
  selectOrderWithUser: 'SELECT * FROM `user`, `order` WHERE `order`.order_id = ? AND `order`.user_id = `user`.user_id',
  selectOrderWithDishes: `SELECT \`dish\`.dish_id, \`dish\`.dish_name, \`dish\`.dish_status FROM \`order_contains\`, \`dish\` 
                          WHERE \`order_contains\`.dish_id = \`dish\`.dish_id AND \`order_contains\`.order_id = ?`,
};
