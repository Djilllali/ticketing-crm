const UserSchema = require('../models/userSchema');
const { hashPassword, checkPassword } = require('../helpers/bcryptHelper');
const { createAccessJwt, createRefreshJwt } = require('../helpers/jwtHelper');
const { getUserById } = require('../helpers/userHelper');

module.exports = {
  //get all users 
  getAllUsers: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'this route is not yet defined',
    });
  },
//create a user 
  createUser: async (req, res) => {
    const { name, phone, country, password, email, type } = req.body;
    const hashedPass = await hashPassword(password);
    console.log('hashed password', hashedPass);
    const newUserObj = {
      name,
      phone,
      country,
      password: hashedPass,
      email,
      type,
    };
    UserSchema(newUserObj)
      .save()
      .then((data) =>
        res.status(200).json({
          status: 'success',
          message: 'User created successfully',
          data: { data },
        })
      )
      .catch((error) =>
        res.status(500).json({
          status: 'error',
          message: error.message,
        })
      );
  },
//logging in 
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'error', message: 'invalid form submition' });
    }
    const getUserByEmail = await UserSchema.findOne({ email });
    const guestPassword = password;
    if (!getUserByEmail) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User not found' });
    }
    const dbUserPassword = getUserByEmail.password;
    const passChecked = await checkPassword(guestPassword, dbUserPassword);
    if (!passChecked) {
      return res
        .status(400)
        .json({ status: 'error', message: 'wrong password' });
    }
    const accessJWT = await createAccessJwt(
      getUserByEmail.email,
      `${getUserByEmail._id}`
    );
    const refreshJWT = await createRefreshJwt(
      getUserByEmail.email,
      `${getUserByEmail._id}`
    );
    const _id = getUserByEmail._id;
    new Promise((resolve, reject) => {
      try {
        UserSchema.findOneAndUpdate(
          { _id },
          {
            $set: {
              'refreshJWT.token': refreshJWT,
              'refreshJWT.addedAt': Date.now(),
            },
          },
          { new: true }
        )
          .then((data) => resolve(data))
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'logged in successfully',
      userType: getUserByEmail.type,
      accessJWT,
      refreshJWT,
    });
  },
//get a single user 
  getUser: async (req, res) => {
    const _id = req.userId;

    const userProf = await getUserById(_id);
    const { name, email, type } = userProf;
    res.json({
      user: {
        _id,
        name,
        email,
        type,
      },
    });
  },

  updateUser: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'this route is not yet defined',
    });
  },

  deleteUser: (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'this route is not yet defined',
    });
  },
};
