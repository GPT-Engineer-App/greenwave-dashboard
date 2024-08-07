import React from 'react';

function App() {
  return <div>{process.env.NODE_ENV}</div>; // (if in development should say development)
}

export default App;
