//const {arcoreimg} = require('../utils/arcore'),
//ImageDb = require('../../models/imagedb');

module.exports = {
  Generalupload: async (req, res, next) => {
    if (req.file) {
      let filename = req.file.filename;
      console.log(req.file.path);
      if (filename) return res.status(200).json({ path: filename });
      return res.status(400).json({ error: 'error upload' });
    }
  },
};
