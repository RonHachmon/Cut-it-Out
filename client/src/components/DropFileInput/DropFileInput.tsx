import React, { useRef, useState } from 'react';
import './drop-file-input.css';
import axios from 'axios';
import uploadImg from '../../assets/cloud-upload-regular-240.png'
import ScissorsSVG from '../ScissorsSVG/ScissorsSVG'
import Button from '../button/ImageButton';
const apiUrl = import.meta.env.VITE_API_URL;

interface DropFileInputProps {
    onFileChange?: (files?: File[]) => void;
  }

  enum imageState {
    Clean,
    Loading,
    Uploaded,
    Done,
  }

  const DropFileInput: React.FC<DropFileInputProps> = ({onFileChange}) => {
    const wrapperRef = useRef<HTMLDivElement >(null);
    const fileBlob = useRef<Blob|null>(null);
    const [state, setState] = useState<imageState>(imageState.Clean);
    const [originImage, setOriginImage] = useState<ArrayBuffer | null | string>(null);
    const [editedImage, setEditedImage] = useState<ArrayBuffer | null | string>(null);
    
    const [Error, setError] = useState<string>("");
    const KB =1024;
    const MB = KB*KB;

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');
    const onDrop = () => wrapperRef.current?.classList.remove('dragover');


    const handleFileDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
        const droppedFile = event.target.files?.[0] ?? null
        console.log(droppedFile?.size);
        if(droppedFile && droppedFile?.size< MB*2)
        {
          setError("")
          fileBlob.current = droppedFile;
          //if file size less than 2MB load image
          const reader = new FileReader();
          reader.onloadend = () => {
              setOriginImage(reader.result as string);
              setState(imageState.Uploaded);
          };

          reader.readAsDataURL(droppedFile);
        }
        else
        {
          setError("The image size should be less than 2MB")
        }
    
        if (onFileChange) {
            onFileChange();
        }
    };

    const cutImage = async () => {
        const formData = new FormData();
        if (fileBlob.current)
        {
            formData.append('file', fileBlob.current);
        }

        console.log("check")
        setState(imageState.Loading)
        let serverHost=apiUrl;
        console.log("host ",serverHost);
        const response = await axios.post(serverHost+'/api/data', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          responseType:'blob'
        });
        fileBlob.current=response.data
        const imageUrl = URL.createObjectURL(response.data);
        setEditedImage(imageUrl)
        setState(imageState.Done)
      };

      const cleanImage =  () => {
        setOriginImage(null)
        setEditedImage(null)
        setState(imageState.Clean)
      };

      const downloadImage =  () => {
        if (fileBlob.current) {
          const filename = `edited-image.png`; // Extract extension
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

    const renderContent = () => {
      switch (state) {
        case imageState.Clean:
          return (
              <div>
                <div className="drop-file-input__label">
                  <img src={uploadImg}  alt="" />
                      <p className='instruction'>Drag & Drop your image here (2 MB or less)</p>
                </div>

                <input type="file" accept='.jpg,.jpeg,.png' value="" onChange={handleFileDrop}/>
              </div>
              
          );
        case imageState.Uploaded:
          return (
            <img src={(originImage as string)} className='working-image' alt="preview"></img>
          );
        case imageState.Done:
          return (
            <img src={(editedImage as string)} className='working-image' alt="preview"></img>
          );
        case imageState.Loading:
          {
          console.log("Load")
          return (
            <div className="spinner"></div>
          );
        }
        default:
          return null;
      }
    };




    return (
        <div>
            <div className="scissors-border">

                  <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}                    
                    >
                <div className='spinning-scissors'>
                <ScissorsSVG/>
                </div>
                      {renderContent()}
                </div>
            </div>
            {Error && <div className='error-text'>{Error}</div>}
            <div className='action-button'>

            <Button onClick={cutImage} disabled={(originImage === null && editedImage === null ) }>Cut</Button>
            <Button onClick={cleanImage} disabled={editedImage === null}>Clean</Button>
            <Button onClick={downloadImage} disabled={editedImage === null}>Download</Button>

            </div>
        </div>
    );
};

export default DropFileInput;