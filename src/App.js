import './App.css';
import Layout from './layouts/Layout';
import { Routes,Route } from 'react-router';
import Users from './pages/Users';
import AddUser from './conponents/Users/AddUser';
import Login from './pages/Login';
import ViewUser from './conponents/Users/ViewUser';
import EditUser from './conponents/Users/EditUser';



// import Navigation from './components/layouts/Navigation';
function App() {
  return (
    <Layout>
      <Routes>
        
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/users/add" element={<AddUser/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/users/view/:id" element={<ViewUser/>}></Route>
        <Route path="/users/edit/:id" element={<EditUser/>}></Route>
        <Route path="/users/delete" element={<h2>Note Deleted</h2>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
