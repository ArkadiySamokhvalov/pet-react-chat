import { useSelector } from 'react-redux';

const promisifySocket = (socketFunc) => (...args) => new Promise((resolve, reject) => {
  socketFunc(...args, (responce) => {
    if (responce.status === 'ok') {
      resolve(responce);
    }
    reject();
  });
});

const getChannelsNames = () => {
  const { entities } = useSelector((state) => state.channels);

  return Object.values(entities).map(({ name }) => name);
};

export { promisifySocket, getChannelsNames };
