import React, { useState } from 'react';
import ImageAnnotation from './ImageAnnotation';

const ImageAnnotationContainer = () => {
    const images = [
        'https://scx2.b-cdn.net/gfx/news/hires/2020/mribrain.jpg',
        'https://prod-images-static.radiopaedia.org/images/19451565/c39b237eee16f3a54dbec4a7e47950.PNG',
        'https://www.melbourneradiology.com.au/wp-content/uploads/2021/06/MRI-BRAIN-WITH-CONTRAST-0002.jpg'
    ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [annotations, setAnnotations] = useState({});

  const handleAnnotate = (imageAnnotations) => {
    setAnnotations({
      ...annotations,
      [images[currentImageIndex]]: imageAnnotations,
    });
  };

  const goToNextImage = () => {
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((index) => (index - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-4">
      <div className="image-container shadow-lg rounded-xl">
        <ImageAnnotation
          imageUrl={images[currentImageIndex]}
          onAnnotate={handleAnnotate}
        />
      </div>
      <div className="image-controls mt-4">
        <button onClick={goToPreviousImage} className="bg-indigo-500 text-white rounded-lg">
          Previous
        </button>
        <span className="text-gray-900">{`Image ${currentImageIndex + 1} of ${images.length}`}</span>
        <button onClick={goToNextImage} className="bg-indigo-500 text-white rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageAnnotationContainer;
