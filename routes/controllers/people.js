const {people} = require('../../02-express-tutorial/data')
const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people});
}

const createPerson =  (req, res) => {
    const {name} = req.body;
    if(!name){
     return res.status(401).json({
        success: false,
        message: "Please provide credentials"
     })
    }

     return res.status(201).json({
        success: true,
        person: name
     })
}

const updatePerson = (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    const person = people.find((person) => person.id === Number(id));
  
    if(!person){
      return res.status(400).json({
          success: false,
          message: `No person with id ${id}`
      })
    }
  
    const newPerson = people.map((person) => {
      if(person.id === Number(id)){
          person.name = name;
      }
      return person;
    })
     res.status(200).json({
      success: true, 
      data: newPerson
  })
  
  }

  const deletePerson =  (req, res) => {
    const {id } = req.params;
    const person = people.find((person) => person.id === Number(id));

    if(!person){
        return res.status(400).json({
            success: false,
             message: `No person found with id ${id}`
            });
    }
    const newPeople = people.filter((person) => person.id !== Number(id));

    return res.status(200).json({
        success: true, 
        data: newPeople
    });
}

module.exports = {
    getPeople,
    updatePerson,
    deletePerson,
    createPerson
}