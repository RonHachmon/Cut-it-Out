import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";
import { promises as fs } from 'fs';



// npx tsc -w
export const cutImage = async ( file_path:any) =>
    {
        const input = sharp(file_path);

        // optional arguments
        const rembg = new Rembg({
            logging: true,
        });
    
        const output = await rembg.remove(input);
    

        await output.png().toFile(`${file_path}.png`)
    
        // optionally you can use .trim() too!
        // await output.webp().toFile(`${file_path}.webp`);
        // await output.trim().webp().toFile("test-output-trimmed.webp");
    }

    // npx tsc -w
export const deleteImage =   (imagePath:string) =>
    {
        fs.unlink(imagePath).then(()=>console.log("deleter file succesfully"))
    }
