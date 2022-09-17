export default (socketFunc) => (...args) => new Promise((resolve, reject) => {
  socketFunc(...args, (responce) => {
    if (responce.status === 'ok') {
      resolve(responce);
    }
    reject();
  });
});
