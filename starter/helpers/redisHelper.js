const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

client.on('error', (err) => {
  client.disconnect(true);
  console.log('Redis Client Error', err);
});
(async () => {
  await client.connect();
})();
const setJWT = async (key, value) => {
  try {
    return await client.set(key, value);
  } catch (error) {
    console.log(error);
  }
};

const getJWT = async (key, value) => {
  try {
    return await client.get(key, value);
  } catch (error) {
    console.log(error);
  }
};

const deleteJWT = async (key) => {
  try {
    return client.del(key);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
