const Person = ({ person, handleDelete }) => (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>
    )
    
  const Persons = ({ persons, handleDelete }) => (
  persons.map(person =>
    <Person key={person.id} person={person} handleDelete={handleDelete}/>
  ))
  
  export default Persons