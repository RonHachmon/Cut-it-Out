import { Rembg } from "@xixiyahaha/rembg-node";
import sharp from "sharp";
const CWD = process.cwd()


// npx tsc -w
const cutImage = async ( file_path:string) =>
    {
        const input = sharp(file_path);

        // optional arguments
        const rembg = new Rembg({
            logging: true,
        });
    
        const output = await rembg.remove(input);
    
        await output.webp().toFile(`${file_path}.webp`);
        await output.png().toFile(`${file_path}.png`)
    
        // optionally you can use .trim() too!
        await output.trim().webp().toFile("test-output-trimmed.webp");
    }
console.log(process.cwd())
///
//cutImage('C:\\Users\\97254\\Desktop\\visual code\\new\\cut-it-out\\server\\test.jpg')
cutImage(CWD+'/test.jpg')

