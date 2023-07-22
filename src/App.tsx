import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from "./components/common/RequireAuth";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import Unauthorized from "./components/common/Unauthorized";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import NewTransaction from "./pages/NewTransaction/NewTransaction";
import ViewTransaction from "./pages/ViewTransaction/ViewTransaction";
import MultiValueForm from "./pages/MultiValueForm/MultiValueForm";
import Users from "./pages/Users/Users";
import MainLayout from './components/layout/MainLayout';

interface UserRoles {
  Admin: string;
  User: string;
}

const ROLES: UserRoles = {
  'Admin': "1",
  'User': "2"
}

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
      
      {/* <Route element={<PrivateRoute /> }> */}
        <Route element={<MainLayout /> }>
          {/* public routes */}
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* private routes */}
          <Route element={<RequireAuth allowedRoles={[ ROLES.Admin, ROLES.User ]} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new-transaction" element={<NewTransaction />} />
            <Route path="view-transaction" element={<ViewTransaction />} />
            <Route path="multivalue-form" element={<MultiValueForm />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ ROLES.Admin ]} />}>
            <Route path="users" element={<Users />} />
          </Route>
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      {/* </Route> */}

    </Routes>
  );
}

export default App;
