import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Student from './Student'
import StudentForm from './StudentForm'
import { useStudentContext } from '@/context/StudentContext';
import styles from '@/styles/Styles.module.css'

const mainStyle = {
        display: 'flex',
        flexDirection: 'row-reverse'
}

function App() {

//  const [students, setStudents] = useState(persons);
    const {students} = useStudentContext();

  return (
      <main className={styles.main}>
          <h1>Gestion des étudiants</h1>
          <section>
            { students.map( s => <Student student={s} />) }
        </section>
        <section>
          <StudentForm />
        </section>
     </main>
  )
}

export default App
