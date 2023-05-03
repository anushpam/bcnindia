import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Nav from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
import NotFound from './pages/NotFound'

import { useState } from 'react';
import SimpleCard from './pages/SignIn';
import Businesses from './pages/Businesses';
import Profile from './pages/Profile';
import RegisterForm from './pages/Register'
import Referrels from './pages/Referrels';
import Jobs from './pages/Jobs';
import Help from './pages/Help';
import Redict from './pages/Redirect';

function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      {admin === null ? (
        <Router>
          <Routes>
            <Route path="/" exact element={<SimpleCard setAdmin={setAdmin} />} />
            <Route path="/registration-form" exact element={<RegisterForm />} />
            <Route path="/redirect/:token" exact element={<Redict setAdmin={setAdmin} />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Nav  setAdmin={setAdmin}>
            <Routes>
              <Route path="/" element={<Profile userId={admin?.userId} businessId={admin?.businessId} />} />
              <Route path="/jobs" element={<Jobs businessId={admin?.businessId} />} />
              <Route path="/businesses" element={<Businesses businessId={admin?.businessId} />} />
              <Route path="/referrels" element={<Referrels  />} />
              <Route path="/help" element={<Help  />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Nav>
        </Router>
      )}
    </ChakraProvider>
  );
}

export default App;
