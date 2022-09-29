import { useSelector } from 'react-redux';
import badWordsFilter from 'leo-profanity';

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

const filterBadWords = (text) => {
  badWordsFilter.loadDictionary();
  const englishFilteredText = badWordsFilter.clean(text);

  badWordsFilter.loadDictionary('ru');
  return badWordsFilter.clean(englishFilteredText);
};

const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

const changeLocation = (location, navigate, routes) => {
  const { from } = location.state || { from: { pathname: routes.homePagePath() } };
  navigate(from);
};

export {
  promisifySocket, getChannelsNames, filterBadWords, capitalizeFirstLetter, changeLocation,
};
