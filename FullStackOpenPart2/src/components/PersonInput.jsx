const PersonInput = ({
  person,
  number,
  handlePersonChange,
  handleNumberChange,
}) => {
  return (
    <div>
      <input value={person} onChange={handlePersonChange} placeholder="Name" />
      <input
        value={number}
        onChange={handleNumberChange}
        placeholder="Number"
      />
    </div>
  );
};

export default PersonInput;
