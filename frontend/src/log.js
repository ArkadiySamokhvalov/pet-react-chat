import React from 'react';

// eslint-disable-next-line react/display-name
const log = (BaseComponent) => (props) => {
  console.log(`Rendering ${BaseComponent.name}`);
  return <BaseComponent { ...props } />;
};

export default log;
