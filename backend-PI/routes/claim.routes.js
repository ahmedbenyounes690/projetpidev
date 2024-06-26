import express from 'express';
import { createClaim, getAllClaims, getClaimById, updateClaimById, deleteClaimById } from '../controllers/claim.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js';

const router = express.Router();

router.post('/', createClaim);
router.get('/', getAllClaims);
router.get('/:id',  getClaimById);
router.put('/:id',  updateClaimById);
router.delete('/:id', deleteClaimById);

export default router;