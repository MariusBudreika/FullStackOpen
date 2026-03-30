import { useState } from "react";
import { useEffect } from "react";
// import Course from "./components/Course.jsx";
import Filter from "./components/Filter.jsx";
import PersonInput from "./components/PersonInput.jsx";
import Persons from "./components/Persons.jsx";
import userService from "./services/userService.js";
import Notification from "./components/Notification.jsx";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    userService.getAll().then((response) => {
      setPersons(response.data);
      console.log(response.data);
    });
  }, []);

  const addNumber = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.person === newName)) {
      alert(`${newName} is already added to phone book`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = {
      person: newName,
      number: newNumber,
    };

    userService.create(personObject).then((response) => {
      setPersons(persons.concat(response.data));
      console.log(response.data);
      setNotificationMessage(`Added ${response.data.person}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
    setNewName("");
    setNewNumber("");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = newFilter
    ? persons.filter((person) =>
        person.person.toLowerCase().includes(newFilter.toLowerCase()),
      )
    : persons;

  const handleDeletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      userService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phone book</h2>
      <Notification message={notificationMessage} />
      <form onSubmit={addNumber}>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
        <h3>add a new</h3>
        <PersonInput
          person={newName}
          handlePersonChange={handlePersonChange}
          number={newNumber}
          handleNumberChange={handleNumberChange}
        />

        <button type="submit">add</button>
      </form>
      <h3>Numbers</h3>
      <Persons
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;

/* function App() {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </>
  );
}

export default App;
*/
