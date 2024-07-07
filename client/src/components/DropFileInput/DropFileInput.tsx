import React, { useRef, useState } from 'react';
import './drop-file-input.css';
import axios from 'axios';
import uploadImg from '../../assets/cloud-upload-regular-240.png'
import ScissorsSVG from '../ScissorsSVG/ScissorsSVG'
import Button from '../button/ImageButton';

interface DropFileInputProps {
    onFileChange: (files: File[]) => void;
  }

  const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
    const wrapperRef = useRef<HTMLDivElement >(null);
    const fileBlob = useRef<Blob|null>(null);
    const [originImage, setOriginImage] = useState<any>(null);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');
    const onDrop = () => wrapperRef.current?.classList.remove('dragover');

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files ? e.target.files[0] : null;

        if (newFile) {
        const reader = new FileReader()
            fileBlob.current=newFile
            reader.onloadend = () => {
                setOriginImage(reader.result)
            }
        
            reader.readAsDataURL(newFile)
        }
        
    }
    const cutImage = async () => {
        const formData = new FormData();
        if (fileBlob.current)
        {
            formData.append('file', fileBlob.current);
        }

        
        const response = await axios.post('http://localhost:3000/api/data', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType:'blob'
        });
        fileBlob.current=response.data
        const imageUrl = URL.createObjectURL(response.data);
        setOriginImage(imageUrl)
      };
      const cleanImage =  () => {
        setOriginImage(null)
      };
      const downloadImage =  () => {
        if (fileBlob.current) {
          const filename = `edited-image.png}`; // Extract extension
          const blobURL = URL.createObjectURL(fileBlob.current);
          const link = document.createElement('a');
          link.href = blobURL;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(blobURL); // Revoke temporary URL
        } else {
          console.error('No image available to download');
        }
      };

    return (
        <div>
            <div className="scissors-border">
                <div className='spinning-scissors'>
                <ScissorsSVG/>
                </div>
                    <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}                    
                    >
                        {originImage ?
                        (<img src={ originImage} className='working-image' alt="preview"></img>) : null}
                        {originImage ? null:
                        <div >
                        <div className="drop-file-input__label">
                        <img src={uploadImg}  alt="" />
                            <p>Drag & Drop your image here</p>
                        </div>
                        <input type="file" accept='.jpg,.jpeg,.png' value="" onChange={onFileDrop}/>
                        </div>
                        }
                    
                </div>
            </div>
            <div className='action-button'>
            <Button onClick={cutImage} disabled={false}>Cut</Button>
      <Button onClick={cleanImage} disabled={false}>Clean</Button>
      <Button onClick={downloadImage} disabled={false}>Download</Button>

            </div>
        </div>
    );
};

export default DropFileInput;