import { useState } from "react";

const StudentForm = ({students, addStudent}) => {
  const [fname, setFname] = useState("")

  const handleChange = (e) => {
    setFname((fname) => e.target.value);
  };

  const handleSubmit = (e) => {
          e.preventDefault();
          const newStudent = {
              name: fname,
              notes: [10]
          }
          addStudent([...students, newStudent]);
  }

  console.log(students);

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
