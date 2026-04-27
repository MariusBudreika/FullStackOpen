const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const phoneNumber = process.argv[4];

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", peopleSchema);

if (personName && phoneNumber) {
  const person = new Person({
    name: personName,
    number: phoneNumber,
  });
  person.save().then(() => {
    console.log(`added ${personName} number ${phoneNumber} to phonebook`);
    mongoose.connection.close();
  });
}

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person.name, person.number);
  });
});

module.exports = mongoose.model("Person", peopleSchema);
