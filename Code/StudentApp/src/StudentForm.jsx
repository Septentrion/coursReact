import { useState } from "react";
import { useStudentContext } from '@/context/StudentContext';

const StudentForm = () => {
  const [fname, setFname] = useState('');
  const {addStudent} = useStudentContext(); 

  const handleChange = (e) => {
    setFname((fname) => e.target.value);
  };

  const handleSubmit = (e) => {
          e.preventDefault();
          addStudent(fname);
  }

  return (
    <>
      <h1>Ajoutez un étudiant</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom : <input type="text" value={fname} onChange={handleChange} />
        </label>
        <input type="submit" value="Ajouter" />
      </form>
      <h5>Prénom : {fname}</h5>
    </>
  );
};

export default StudentForm;
