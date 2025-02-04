import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import MyMenu from './components/nav/Menu';

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
        <Button type='primary'>测试antDesign</Button>
        <MyMenu />
      </body>
    </div>
  );
}

export default App;
