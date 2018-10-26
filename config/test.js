const connectionPromise = require('./mysql-config').getConnection();

connectionPromise.then((connection) => {
  const user = {
    user_id: 1,
    user_full_name: 'Duy Phan',
    user_phone_number: '0374028712',
    user_address: 'IU-VNU'
  };
  return new Promise((resolve, reject) => {
    connection.query('insert into user set ?', user)
      .then((rows) => {
        resolve({ rows, connection });
      })
      .catch((err) => {
        reject(err);
      })
  });
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});