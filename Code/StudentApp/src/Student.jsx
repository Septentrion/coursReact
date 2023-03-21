
function Student({student}) {

        return (
            <article>
                <h1>{student.name}</h1>
                <ul>
                     {student.notes.map( note => <li>{note}</li>) }
                </ul>
                <p>Moyenne : {student.notes.reduce( (a, b) => a + b) / student.notes.length}</p>
            </article>
        )
}

export default Student
