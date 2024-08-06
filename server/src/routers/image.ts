import express, { Request, Response } from 'express';
import { cutImage,deleteImage } from '../model/imageEditor';
import path from 'path'
import multer from 'multer';

const router = express.Router();


// Configure Multer for file upload
const upload = multer({
    dest: 'uploads/', 
  });

router.post('/data',upload.single('file'), async (req: Request, res: Response) => {
  if((req as any).file.size>1024*1024*3)
  {
    console.log((req as any).file.size)
    res.status(413).send('The image size should be less than 2MB')
  }
  console.log('Cut image request')
  if(req.file)
  {
    const uploadedImage: Express.Multer.File = req.file;
    await cutImage(uploadedImage.path)
    let newFileName = uploadedImage.filename+'.png'
    const fullPath  = path.join(process.cwd(),'uploads',newFileName)    
    res.sendFile(fullPath, (err)=>{
      if (err)
      {
        console.log("Error sending file")
      }
      else
      {
        deleteImage(fullPath)
        deleteImage(uploadedImage.path)
      }
    })
   
  }
  else
  {
    res.status(400).send('Please send an image');
  }

});

export default router;