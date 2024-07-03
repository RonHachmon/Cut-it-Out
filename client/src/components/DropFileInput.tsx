import React, { useRef, useState } from 'react';
import './drop-file-input.css';

import uploadImg from '../assets/cloud-upload-regular-240.png';

interface DropFileInputProps {
    onFileChange: (files: File[]) => void;
  }

  const DropFileInput: React.FC<DropFileInputProps> = ({ onFileChange }) => {
    const wrapperRef = useRef<HTMLDivElement >(null);

    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');
    const onDrop = () => wrapperRef.current?.classList.remove('dragover');

    const onFileDrop = (e: any) => {
        const newFile = e?.target?.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            onFileChange(updatedList);
        }
    }

    const fileRemove = (file:File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        onFileChange(updatedList);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    {/* <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
};

export default DropFileInput;