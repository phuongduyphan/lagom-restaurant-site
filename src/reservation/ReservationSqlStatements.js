module.exports = {
  insertQuery: 'INSERT INTO ?? SET ?',
  selectReservationWithUser: `SELECT * FROM \`user\`, \`reservation\` WHERE \`reservation\`.user_id = \`user\`.user_id
                              AND \`reservation\`.reservation_id = ?`,
  updateReservationStatus: `UPDATE \`reservation\` SET ? WHERE \`reservation\`.reservation_id = ?`,                          
};