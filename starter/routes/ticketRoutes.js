const express = require('express');
const router = express.Router();
const {
  insertTicket,
  getTickets,
  getNewTickets,
  getTicketById,
  getSingleTicketById,
  updateClientReply,
  updateStatusEnCours,
  getEncoursTickets,
  deleteTicket,
  getTermineTickets,
  updateStatusTermine,
  updateDownloaded,
  getReadyTickets,
  getArchivedTickets,
} = require('../controllers/ticketController');
const { userAuthorization } = require('../middlewares/authorizationMidleware');

const {
  createNewTicketValidation,
  replyTicketMessageValidation,
} = require('../middlewares/formValidationMiddleware');

router.all('/', (req, res, next) => {
  // res.json({ message: "return form ticket router" });

  next();
});

// create new ticket
router.post(
  '/',
  createNewTicketValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const { subject, description, deadline } = req.body;
      // if (!subject || !description || !deadline) {
      //   return res.json({
      //     status: 'error',
      //     message: 'Unable to create the ticket , please try again later',
      //   });
      // }
      const userId = req.userId;

      const ticketObj = {
        assistantFrId: userId,
        subject,
        description,
        deadline,
      };

      const result = await insertTicket(ticketObj);

      if (result._id) {
        return res.json({
          status: 'success',
          message: 'New ticket has been created!',
        });
      }

      res.json({
        status: 'error',
        message: 'Unable to create the ticket , please try again later',
      });
    } catch (error) {
      res.json({ status: 'error', message: error.message });
    }
  }
);

// Get all tickets for a specific user
router.get('/', userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getTickets(userId);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});
// Get all not archived tickets  for a specific user
router.get('/ready', userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getReadyTickets(userId);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});
// Get all rchived tickets  for a specific user
router.get('/archived', userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getArchivedTickets(userId);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});
// Get only new tickets
router.get('/newTickets', userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getNewTickets(userId);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});
// Get only in progress tickets
router.get('/encours', userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getEncoursTickets(userId);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});
// Get only finished tickets
router.get('/termine', userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getTermineTickets(userId);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// Get all tickets for a specific user
router.get('/user', userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;

    const clientId = req.userId;
    const result = await getTicketById(_id, clientId);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});
//get a single ticket
router.get('/single/:_id', userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    console.log('params id 1', req.params._id);

    const result = await getSingleTicketById(_id);

    return res.json({
      status: 'success',
      result,
    });
  } catch (error) {
    console.log('params id 2', req.params._id);
    res.json({ status: 'error', message: error.message });
  }
});

// update reply message form client
router.put(
  '/:_id',
  replyTicketMessageValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { _id } = req.params;
      const clientId = req.userId;

      const result = await updateClientReply({ _id, message, sender });

      if (result._id) {
        return res.json({
          status: 'success',
          message: 'your message updated',
        });
      }
      res.json({
        status: 'error',
        message: 'Unable to update your message please try again later',
      });
    } catch (error) {
      res.json({ status: 'error', message: error.message });
    }
  }
);
// update ticket status to encours
router.patch('/encours/:_id', userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    console.log('update ID', req.params._id);
    const result = await updateStatusEnCours({ _id, clientId });

    if (result._id) {
      return res.json({
        status: 'success',
        message: 'Status updated to en cours successfully',
      });
    }
    res.json({
      status: 'error',
      message: 'Unable to update the ticket',
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});
// update ticket downloaded to true
router.patch('/termine/:_id', userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    const result = await updateDownloaded({ _id, clientId });

    if (result._id) {
      return res.json({
        status: 'success',
        message: 'Tickeet archived successfully',
      });
    }
    res.json({
      status: 'error',
      message: 'Unable to archive this ticket',
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// update ticket status to close
router.post('/encours/close', userAuthorization, async (req, res) => {
  try {
    const { _id, notes, path } = req.body;
    const clientId = req.userId;
    const result = await updateStatusTermine({ _id, clientId, notes, path });

    if (result._id) {
      return res.json({
        status: 'success',
        message: 'The ticket has been closed',
      });
    }
    res.json({
      status: 'error',
      message: 'Unable to update the ticket',
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// Delete a ticket
router.delete('/:_id', userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await deleteTicket({ _id, clientId });

    return res.json({
      status: 'success',
      message: 'The ticket has been deleted',
    });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

module.exports = router;
