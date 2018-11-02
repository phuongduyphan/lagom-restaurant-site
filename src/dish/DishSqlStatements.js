module.exports = {
  selectAllDishes: `SELECT * FROM \`dish\``,
  insertQuery: `INSERT INTO ?? SET ?`,
  updateDish: `UPDATE \`dish\` SET ? WHERE \`dish\`.dish_id = ?`,
};