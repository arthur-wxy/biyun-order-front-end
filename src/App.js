import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import MyMenu from './components/nav/Menu';
import MainLayout from './components/layout/MainLayout';
import OrderSearchForm from './components/order_query/OrderSearchForm';

function App() {
  return (
    <div className="App">
      <MainLayout
        menu={<MyMenu />}
        content={<OrderSearchForm />}
      />
    </div>
  );
}

export default App;
