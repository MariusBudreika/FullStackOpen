import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100 + " %";

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="all" value={total} />
        <StatisticLine label="average" value={average} />
        <StatisticLine label="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const setVote = (vote) => {
    if (vote === "good") {
      setGood((prev) => prev + 1);
    } else if (vote === "neutral") {
      setNeutral((prev) => prev + 1);
    } else if (vote === "bad") {
      setBad((prev) => prev + 1);
    }
  };

  const setRandomNumber = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setVote("good")} text="good"></Button>
      <Button onClick={() => setVote("neutral")} text="neutral"></Button>
      <Button onClick={() => setVote("bad")} text="bad"></Button>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      <h2>Random anecdotes</h2>
      <p>{anecdotes[selected]}</p>
      <Button onClick={() => setRandomNumber()} text="next anecdote"></Button>
    </div>
  );
};

export default App;
