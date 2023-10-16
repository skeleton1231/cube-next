// components/MyComponent.tsx
import React from 'react';

type Props = {
  text: string;
};

const MyComponent: React.FC<Props> = ({ text }) => {
  return <div>{text}</div>;
};

export default MyComponent;
