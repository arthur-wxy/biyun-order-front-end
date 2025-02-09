import React from 'react';
import MainLayout from './components/layout/MainLayout';
import MyMenu from './components/nav/Menu';

function App() {
  return (
    <div className="App">
      <MainLayout menu={<MyMenu />} />
    </div>
  );
}

export default App;
