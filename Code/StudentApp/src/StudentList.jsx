import { useState } from "react";
import { useStudentContext } from '@/context/StudentContext';
import Student from "@/Student"

const StudentList = () => {
  const {students} = useStudentContext(); 

  return (
    <>
      <section>
        { students.map( s => <Student student={s} />) }
      </section>
    </>
  );
};

export default StudentList;
