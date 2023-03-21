import { Routes, Route } from 'react-router-dom';

import Layout from '@/components/Layout';
import AboutOptions from '@/components/AboutOptions';

import Home from "@/routes/Home"
import StudentList from "@/StudentList"
import StudentForm from "@/StudentForm"
import NotFound from "@/routes/NotFound"

const StudentsApp = () => {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<StudentList />} />
          <Route path="form" element={<StudentForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  );
};

export default StudentsApp;

