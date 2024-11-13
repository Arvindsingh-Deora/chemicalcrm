import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/images');
        
        // Process each image
        const imageList = await Promise.all(
          response.data.map(async (image) => {
            // Fetch the binary image data
            const imgResponse = await axios.get(`http://localhost:5000/images/${image._id}`, {
              responseType: 'arraybuffer',
            });

            // Convert array buffer to base64
            const base64String = btoa(
              new Uint8Array(imgResponse.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            const imageUrl = `data:${image.img.contentType};base64,${base64String}`;
            return { id: image._id, name: image.name, url: imageUrl };
          })
        );

        setImages(imageList);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching images');
      }
    };

    fetchImages();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Uploaded Images</h2>
      {images.length > 0 ? (
        <ul>
          {images.map((image) => (
            <li key={image.id}>
              <p>{image.name}</p>
              <img src={image.url} alt={image.name} style={{ width: '200px', height: 'auto' }} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
};

export default ImagesList;
