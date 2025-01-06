require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods:[String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'Witkor',
    age: 29,
    favoriteFoods: ['Cake', 'Burger'],
  });

  person.save(function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

let arrayOfPeople = [
  {
    name: 'Witkor',
    age: 29,
    favoriteFoods: ['Cake', 'Burger'],
  }
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

let personName = 'Witkor';
const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

let food = 'Cake';
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

let personId = 1;
const findPersonById = (personId, done) => {
  Person.findById({_id:personId},function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id:personId},function (err, data) {
    
    if (err) return done(err);

    let person = data;
    person.favoriteFoods.push(foodToAdd);
    person.save(function (err, data) {
    
      if (err) return done(err);
      done(null,data);
    });

  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name:personName},
    {age: ageToSet},
    {new: true},
    function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    {_id:personId},
    function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {name:nameToRemove},
    function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select(['name','favoriteFoods'])
  .exec(function (err, data) {
    
    if (err) return done(err);
    done(null,data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
