import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import MyMenu from './components/nav/Menu';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <body>
        <div>
        <MainLayout menu={<MyMenu/>}/>
        </div>
      </body>
    </div>
  );
}

export default App;
