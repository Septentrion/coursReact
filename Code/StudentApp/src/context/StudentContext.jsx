import { useState, useEffect, useContext, createContext } from 'react';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
        const initialStudents = [
          { notes: [12, 11, 10], name: "Alan" },
          { notes: [18, 10, 19], name: "Alice" },
          { notes: [10, 9, 11], name: "Bernard" },
          { notes: [11, 17, 19], name: "Sophie" },
        ];

        const [students, setStudents] = useState(getInitialStudents());
        const addStudent = (name) =>  setStudents([...students, {name: name, notes: [10]}]);
        
        function getInitialStudents() {
            // getting stored items
            const temp = localStorage.getItem('students');
            const savedTodos = JSON.parse(temp);
            return savedTodos || initialStudents;
        }

        function saveStudents(updatedStudents) {
            localStorage.setItem('students', updatedStudents);
        }

        useEffect(
                () => {
                    // storing todos items
                    const temp = JSON.stringify(students);
                    saveStudents(temp);
                   }, 
                [students]
        );

        return (
   <StudentContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
