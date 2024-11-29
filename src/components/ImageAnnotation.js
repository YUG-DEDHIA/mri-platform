import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Circle, Square } from 'lucide-react';

const ImageAnnotation = ({ imageUrl, onAnnotate }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen'); // Can be 'pen', 'circle', or 'square'
  const [annotations, setAnnotations] = useState([]);
  const [startPoint, setStartPoint] = useState(null);

  // Load image onto the canvas and clear any existing drawings
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      redrawAnnotations(ctx);
    };
  }, [imageUrl, annotations]);

  // Redraw all annotations
  const redrawAnnotations = (ctx) => {
    annotations.forEach(annotation => {
      if (annotation.tool === 'pen') {
        ctx.beginPath();
        ctx.moveTo(annotation.points[0][0], annotation.points[0][1]);
        annotation.points.forEach(([x, y]) => {
          ctx.lineTo(x, y);
        });
        ctx.stroke();
      } else if (annotation.tool === 'circle') {
        const [x, y, radius] = annotation.shape;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (annotation.tool === 'square') {
        const [x, y, width, height] = annotation.shape;
        ctx.strokeRect(x, y, width, height);
      }
    });
  };

  // Start drawing on canvas
  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);

    if (tool === 'pen') {
      setAnnotations([...annotations, { tool, points: [[x, y]] }]);
    } else {
      setStartPoint([x, y]);
    }
  };

  // Draw on canvas based on the selected tool
  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'pen') {
      const newAnnotations = [...annotations];
      const currentAnnotation = newAnnotations[newAnnotations.length - 1];
      currentAnnotation.points.push([x, y]);
      setAnnotations(newAnnotations);
    }
  };

  // Stop drawing and finalize the annotation
  const stopDrawing = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'circle' && startPoint) {
      const [startX, startY] = startPoint;
      const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
      setAnnotations([...annotations, { tool, shape: [startX, startY, radius] }]);
    } else if (tool === 'square' && startPoint) {
      const [startX, startY] = startPoint;
      const width = x - startX;
      const height = y - startY;
      setAnnotations([...annotations, { tool, shape: [startX, startY, width, height] }]);
    }
    setIsDrawing(false);
    setStartPoint(null);
    onAnnotate(annotations); // Save annotations to the parent component
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800} height={600} // Set dimensions to match your image
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="absolute inset-0 z-10"
      />
      <div className="absolute top-4 left-4 flex gap-2 bg-black/50 p-2 rounded-lg annotation-toolbox">
        <button
          onClick={() => setTool('pen')}
          className={`p-2 rounded-lg ${tool === 'pen' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTool('circle')}
          className={`p-2 rounded-lg ${tool === 'circle' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <Circle className="w-5 h-5" />
        </button>
        <button
          onClick={() => setTool('square')}
          className={`p-2 rounded-lg ${tool === 'square' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <Square className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ImageAnnotation;
