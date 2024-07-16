import * as sharp from "sharp";
export declare class Rembg {
    private readonly options;
    private modelDownloaded;
    private promisesResolvesUntillDownloaded;
    private readonly u2netHome;
    readonly modelPath: string;
    private log;
    constructor(options?: {
        logging?: boolean;
    });
    private ensureModelDownloaded;
    /**
     * 去除指定图像的背景
     * @param sharpInput 输入图片对象
     * @param bgColor 自定义背景颜色（可选参数）。字符串格式，如：'#F0A703'，'red'等等。
     * @returns
     */
    remove(sharpInput: sharp.Sharp, bgColor?: string): Promise<sharp.Sharp>;
}
