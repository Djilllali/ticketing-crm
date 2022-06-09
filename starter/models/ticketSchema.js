const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  assistantFrId: {
    type: Schema.Types.ObjectId,
  },
  assistantDzId: {
    type: Schema.Types.ObjectId,
  },

  subject: {
    type: String,
    maxlength: 100,
    required: true,
    default: '',
  },
  description: {
    type: String,
    maxlength: 500,
    required: true,
    default: '',
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  endAt: {
    type: Date,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    maxlength: 30,
    required: true,
    default: 'Nouveau',
  },
  zipFile: {
    type: String,
    maxlength: 100,
  },
  downloaded: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
});

module.exports = {
  TicketSchema: mongoose.model('Ticket', TicketSchema),
};
