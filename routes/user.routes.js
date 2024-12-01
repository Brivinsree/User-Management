import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import validateUser from '../middleware/usermiddleware.js';
import FileUploadController from '../controllers/imageupload.js';
import multer from 'multer';
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `UserPic-${Date.now()}-${file.originalname}`); // Add timestamp to avoid name conflicts
    },

});
const upload = multer({ storage: storage });


//TO PERFOR CRUD FOR USER DETAILS
router.post('/create', validateUser, UserController.createuser);
router.get('/fetch', UserController.getuser);
router.put('/update/:id', validateUser, UserController.update);
router.delete('/delete/:id', UserController.delete);
router.post('/fileUpload', upload.single("profilePic"), FileUploadController.uploadFile);



export default router;