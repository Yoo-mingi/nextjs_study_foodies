'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
    const [selectedImage, setSelectedImage] = useState();
    const imageInputRef = useRef();

    function handlePickClick() {
        imageInputRef.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        
        if(!file) {
            setSelectedImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setSelectedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!selectedImage && <p>No image picked yet.</p>}
                    {selectedImage && (
                        <Image 
                            src={selectedImage} 
                            alt="The image selected by the user" 
                            fill
                        />
                    )}
                </div>
                <input 
                    className={classes.input}
                    type="file" 
                    id={name}
                    accept="image/png, image/jpeg" 
                    name={name}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                    required
                />
                <button 
                    className={classes.button} 
                    type="button" 
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}