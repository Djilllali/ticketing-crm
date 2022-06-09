let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ZipFileSchema = new Schema(
  {
    link: {
      type: String,
    },

    zip_list: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);
const ZipFile = mongoose.model('ImageDb', ZipFileSchema);

module.exports = ZipFile;
