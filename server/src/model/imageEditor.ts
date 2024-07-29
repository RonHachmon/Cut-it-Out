import {Rembg} from "."
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
        console.log("API cutting image")
        const output = await rembg.remove(input);
        console.log("API done ")
    

        await output.png().toFile(`${file_path}.png`)
    
        // optionally you can use .trim() too!
        // await output.webp().toFile(`${file_path}.webp`);
        // await output.trim().webp().toFile("test-output-trimmed.webp");
    }

    // npx tsc -w
    export const deleteImage = async (imagePath: string) => {
        try {
            await fs.unlink(imagePath);
            console.log("Deleted file successfully");
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };