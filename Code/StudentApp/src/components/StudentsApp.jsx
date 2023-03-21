import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import AboutOptions from '@/components/AboutOptions';

import Home from '@/routes/Home';
import About from '@/routes/About';
import Login from '@/routes/Login';
import Profile from '@/routes/Profile';
import NotFound from '@/routes/NotFound';

const StudentsApp = () => {
  return (
    <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} >
            <Route path=":slug" element={<AboutOptions />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
       </Route>
    </Routes>
  );
};

export default StudentsApp;

