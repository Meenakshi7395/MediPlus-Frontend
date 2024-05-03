import './App.css';
import Layout from './layouts/Layout';
import { Routes,Route } from 'react-router';
import Users from './pages/Users';
import AddUser from './components/Users/AddUser';
import Login from './pages/Login';
import ViewUser from './components/Users/ViewUser';
import EditUser from './components/Users/EditUser';
import Patients from './pages/Patients';
import AddPatient from './components/Patients/AddPatient';
import ViewPatient from './components/Patients/ViewPatient';
import EditPatient from './components/Patients/EditPatient';
import Medicines from './pages/Medicines';
import AddMedicine from './components/Medicines/AddMedicine';
import ViewMedicine from './components/Medicines/ViewMedicine';
import EditMedicine from './components/Medicines/EditMedicine';
import AddIncident from './components/Incidents/AddIncident';
import EditIncident from './components/Incidents/EditIncident';
import ViewIncident from './components/Incidents/ViewIncident';

// import Navigation from './components/layouts/Navigation';
function App() {
  return (
    <Layout>
      <Routes>
        {/* users all routes */}
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/users/add" element={<AddUser/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/users/view/:id" element={<ViewUser/>}></Route>
        <Route path="/users/edit/:id" element={<EditUser/>}></Route>
        <Route path="/users/delete" element={<h2>Note Deleted</h2>}></Route>

        {/* All patients routes */}
        <Route path="/patients" element={<Patients/>}></Route>
        <Route path="/patients/add" element={<AddPatient/>}></Route>
        <Route path="/patients/view/:id" element={<ViewPatient/>}></Route>
        <Route path="/patients/edit/:id" element={<EditPatient/>}></Route>

        {/* all medicines routes */}
        <Route path="/medicines" element={<Medicines/>}></Route>
        <Route path="/medicines/add" element={<AddMedicine/>}></Route>
        <Route path="/medicines/view/:id" element={<ViewMedicine/>}></Route>
        <Route path="/medicines/edit/:id" element={<EditMedicine/>}></Route>
        
        <Route path="/incidents/:patientId/:patientName" element={<AddIncident/>}></Route>
        <Route path="/incidents/edit/:id" element={<EditIncident/>}></Route>
        <Route path="/incidents/view/:id" element={<ViewIncident/>}></Route>

      </Routes>
    </Layout>
  );
}

export default App;
