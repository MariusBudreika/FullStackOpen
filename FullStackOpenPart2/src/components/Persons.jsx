const Persons = ({ filteredPersons, handleDeletePerson }) => {
  return (
    <ul>
      {filteredPersons.map((person) => {
        return (
          <li key={person.id}>
            {person.person} {person.number}{" "}
            <button onClick={() => handleDeletePerson(person.id)}>
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
