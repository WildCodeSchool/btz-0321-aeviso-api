const express = require('express');
const usersExample = require('./dev/usersExample');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(usersExample);
});

router.get('/:id', (req, res) => {
  const result = usersExample.find((user) => user.id === +req.params.id);
  if (result) res.status(200).json(result);
  else
    res.status(404).json({
      message: 'No user found',
    });
});

router.post('/', (req, res) => {
  const initial = usersExample;
  const newUser = {
    id: [...initial].pop().id + 1,
    ...req.body,
  };
  initial.push(newUser);
  res.status(201).json(initial[initial.length - 1]);
});

router.put('/:id', (req, res) => {
  const { firstname, lastname, email, role, profession } = req.body;
  const id = +req.params.id;
  const index = usersExample.findIndex((user) => user.id === +req.params.id);
  if (index >= 0) {
    let elementToUpdate = usersExample[index];
    elementToUpdate = {
      id,
      firstname: firstname || elementToUpdate.firstname,
      lastname: lastname || elementToUpdate.lastname,
      email: email || elementToUpdate.email,
      role: role || elementToUpdate.role,
      profession: profession || elementToUpdate.profession,
    };
    usersExample.splice(index, 1, elementToUpdate);
    res.status(200).json(elementToUpdate);
  } else
    res.status(404).json({
      message: 'No user found',
    });
});

router.delete('/:id', (req, res) => {
  const id = +req.params.id;
  const index = usersExample.indexOf(
    usersExample.find((user) => user.id === id)
  );
  if (index >= 0) {
    usersExample.splice(index, 1);
    res.status(204).json({
      message: 'User deleted',
    });
  } else
    res.status(404).json({
      message: 'No user found',
    });
});

module.exports = router;
