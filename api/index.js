//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {
  conn, Diet
} = require('./src/db.js');

// Syncing all the models at once.
conn.sync({
  force: true
}).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });

  let diets = ['Whole30', 'Low FODMAP', 'Primal', 'Paleo', 'Pescetarian', 'Vegan', 'Ovo Vegetarian', 'Lacto Vegetarian', 'Vegetarian', 'Ketogenic', 'Gluten Free'];
  
  diets = diets.map(x  => {
    Diet.create({
      name: x
    });
  });

  Promise.all(diets)
    .then(response => console.log('Datos cargados correctamente'))
    .catch(error => console.log(error));
});