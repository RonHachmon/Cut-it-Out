import React, { useRef, useState, useEffect } from 'react';
import './drop-file-input.css';

import uploadImg from '../assets/cloud-upload-regular-240.png';
import ScissorsSVG from './ScissorsSVG'

interface DropFileInputProps {
    onFileChange: (files: File[]) => void;
  }

  const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
    const wrapperRef = useRef<HTMLDivElement >(null);
    const [originImage, setOriginImage] = useState<any>(null);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');
    const onDrop = () => wrapperRef.current?.classList.remove('dragover');

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files ? e.target.files[0] : null;
        if (newFile) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setOriginImage(reader.result)
          }
      
          reader.readAsDataURL(newFile)
        }
        
    }

    return (
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
    );
};

export default DropFileInput;