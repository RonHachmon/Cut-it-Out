import express, { Request, Response } from 'express';
import { cutImage,deleteImage } from '../model/imageEditor';
import path from 'path'
import multer from 'multer';

const router = express.Router();


// Configure Multer for file upload
const upload = multer({
    dest: 'uploads/', // Set destination for uploaded files (optional)
    limits: { fileSize: 100000000000000 }, // Set file size limit in bytes (optional)
    // fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    //     const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    //     const extension = fs.extname(file.originalname).toLowerCase();
    //     // if (!allowedExtensions.includes(extension)) {
    //     //   return cb(new Error('Invalid file type!'), false);
    //     // }
    //   cb(null, true);
    // } // Validate file type (optional)
  });

router.post('/data',upload.single('file'), async (req: Request, res: Response) => {
  console.log(`MEOW`);
  console.log('Cut image request')
  if(req.file)
  {
    const uploadedImage: Express.Multer.File = req.file;
    await cutImage(uploadedImage.path)
    let newFileName = uploadedImage.filename+'.png'
    const fullPath  = path.join(process.cwd(),'uploads',newFileName)    
    res.sendFile(fullPath)
  }
  else
  {
    res.status(400).send('Please send an image');
  }



});

export default router;