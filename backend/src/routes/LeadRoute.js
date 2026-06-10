import express from 'express';
import {
    createLead, 
    loginLead, 
    getLeads, 
    updateLead,
    deleteLead,
    getLeadById,
    getLead,
    Logout,
    filterLeads
} from '../controllers/AuthController.js';
import auth from '../middleware/AuthMiddleware.js';


const router = express.Router();

router.post('/register',createLead);
router.post('/login', loginLead);
router.get('/all', auth, getLeads);
router.put('/update/:id', auth, updateLead)
router.delete('/delete/:id', auth, deleteLead);
router.get('/:id', auth, getLeadById);
router.post('/logout', Logout);
router.get('/me', auth, getLead);
router.get('/query/filter', auth, filterLeads);

export default router;