import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Student from './Student'
import StudentForm from './StudentForm'

function App() {
  
  const persons = [
        { name: 'Arthur', notes: [10,12,15] }
  ];

  const [students, setStudents] = useState(persons);

  return (
      <main style={{display:'flex'}}>
        <section>
            { students.map( s => <Student student={s} />) }
        </section>
        <section>
          <StudentForm students={students} addStudent={setStudents} />
        </section>
      </main>
  )
}

export default App
