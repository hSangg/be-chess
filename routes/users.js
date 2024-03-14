import express from 'express'
import { userInfo } from 'os';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello');
});


export default router;


