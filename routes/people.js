const express = require('express');
const {people} = require('../02-express-tutorial/data')
const router = express.Router();
const {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson
    } = require('./controllers/people');

// // router.get('/', getPeople )
// // router.post('/api/postman/people',createPerson);
// // router.put('/api/people/:id', updatePerson )
// router.delete('/api/people/:id', deletePerson)

router.route('/').get(getPeople);
router.route('/api/postman/people').post(createPerson);
router.route('/api/people/:id').put(updatePerson).delete(deletePerson);
module.exports = router;