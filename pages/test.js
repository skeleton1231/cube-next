// pages/index.js
import MyComponent from '@/components/MyComponent';
import React from 'react';
const TestPage = () => {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <MyComponent text='Text Component'/>
    </div>
  );
};

export default TestPage;
