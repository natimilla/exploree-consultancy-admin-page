import { Route } from 'react-router-dom';
import './App.css';
import Overlay from './components/overlay/Overlay';
import { useSelector } from 'react-redux';
import DisableDate from './components/Disable Dates/DisableDate';
import TableList from './components/TableLists/TableList';
import NavBar from './components/NavigationBar/NavBar';
import { Helmet } from 'react-helmet';

function App() {
  const loading=useSelector(Store=>Store.display.loading)
  const error=useSelector(Store=>Store.display.error)
  const display=loading || error
  return (
    <div className='App'>
       <Helmet>
        <title>Exploree Consultancy - Admin</title>
        <meta name="description" content="Manage all your Exploree Consultancy administrative tasks in one place." />
        <meta name="keywords" content="Exploree Consultancy, Admin, Dashboard, Management" />
        <meta name="author" content="Exploree Consultancy Team" />
      </Helmet>
      <NavBar/>
      {display && <Overlay/>}
      <Route path='/' exact ><TableList/></Route>
      <Route path='/disable_date'><DisableDate/></Route>
      </div>
  );
}

export default App;
