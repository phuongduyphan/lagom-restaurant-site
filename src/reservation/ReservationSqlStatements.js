module.exports = {
  insertQuery: 'INSERT INTO ?? SET ?',
  selectReservationWithUser: `SELECT * FROM \`user\`, \`reservation\` WHERE \`reservation\`.user_id = \`user\`.user_id
                              AND \`reservation\`.reservation_id = ?`,
  updateReservationStatus: `UPDATE \`reservation\` SET ? WHERE \`reservation\`.reservation_id = ?`,
  selectPendingReservationWithUser: `SELECT * FROM \`user\`, \`reservation\` WHERE \`reservation\`.user_id = \`user\`.user_id
  AND \`reservation\`.reservation_status = 'pending'`,
  selectConfirmedReservationWithUser: `SELECT * FROM \`user\`, \`reservation\` WHERE \`reservation\`.user_id = \`user\`.user_id
  AND \`reservation\`.reservation_status = 'confirmed'`,
  selectDeclinedReservationWithUser: `SELECT * FROM \`user\`, \`reservation\` WHERE \`reservation\`.user_id = \`user\`.user_id
  AND \`reservation\`.reservation_status = 'declined'`,
};