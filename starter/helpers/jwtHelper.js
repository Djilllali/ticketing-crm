const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const { getJWT, setJWT } = require('./redisHelper');
const createAccessJwt = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1d', //change this to 15m
    });
    /// when i comment this line everything works fine
    await setJWT(accessJWT, _id);
    return accessJWT;
  } catch (error) {
    console.log(error);
  }
};

const createRefreshJwt = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAccessJwt = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};
const verifyRefreshJwt = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};

module.exports = {
  createAccessJwt,
  createRefreshJwt,
  verifyAccessJwt,
  verifyRefreshJwt,
};
