import express from 'express';
import auth from '../middleware/auth';
import { Newbie } from '../models/newbie.model';
import { User } from '../models/user.model';
import errorHandler from './error';

const router = express.Router();

// get all the newbies
router.get('/', (req, res) => {
  Newbie.find({})
    .sort({ timestamp: 'desc' })
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((error) => {
      return res.status(400).json({ sucess: false, error });
    });
});

// create a newbie
router.post('/create', async (req, res) => {
  const { userId } = req;
  const { gradYear, hometown, funFact, firstName, lastName } = req.body;

  const newNewbie = new Newbie({
    userID: 2,
    firstName: firstName,
    lastName: lastName,
    gradYear: gradYear,
    hometown: hometown,
    funFact: funFact,
  });

  await newNewbie.save().catch((e) => errorHandler(res, e));

  return res
    .status(200)
    .json({ success: true, message: 'Newbie created succesfully' });
});

// delete a certain newbie
router.delete('/:newbieID/delete', auth, async (req, res) => {
  const { newbieID } = req.params;
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) return errorHandler(res, 'User is not valid');
  Newbie.findByIdAndRemove(newbieID)
    .then(() => res.status(200).json({ success: true }))
    .catch((e) => errorHandler(res, e));
});

export default router;
