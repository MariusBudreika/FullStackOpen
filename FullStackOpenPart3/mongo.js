const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://mariuzazDB:${password}@cluster0.dmvbog1.mongodb.net/phoneBookApp?appName=phoneBookApp0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

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
  });
}

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person.name, person.number);
  });
  mongoose.connection.close();
});
