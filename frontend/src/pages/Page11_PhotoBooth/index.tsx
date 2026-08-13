import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

export const PhotoBoothPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [filter, setFilter] = useState('none');
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownRef = useRef<number | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsCameraReady(true);
        }
      } catch (error) {
        console.error('Camera access denied:', error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const applyFilter = (imageData: ImageData, filterType: string): ImageData => {
    const data = imageData.data;
    switch (filterType) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }
        break;
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        break;
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;
      default:
        break;
    }
    return imageData;
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isCameraReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (filter !== 'none') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const filteredData = applyFilter(imageData, filter);
      ctx.putImageData(filteredData, 0, 0);
    }

    const photoData = canvas.toDataURL('image/png');
    setCapturedPhotos((prev) => [photoData, ...prev]);
  };

  const startCountdown = () => {
    if (countdown !== null) return;
    setCountdown(3);
    let count = 3;
    countdownRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(countdownRef.current!);
        countdownRef.current = null;
        setCountdown(null);
        capturePhoto();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Photo Booth 📸</h1>
      <div className={styles.booth}>
        <div className={styles.camera}>
          <video ref={videoRef} className={styles.video} muted playsInline />
          <div className={styles.overlay}>
            {countdown !== null && (
              <div className={styles.countdown}>{countdown}</div>
            )}
          </div>
          <canvas ref={canvasRef} className={styles.canvas} style={{ display: 'none' }} />
        </div>
        <div className={styles.controls}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="none">No Filter</option>
            <option value="grayscale">Grayscale</option>
            <option value="sepia">Sepia</option>
            <option value="invert">Invert</option>
          </select>
          <button
            className={styles.captureButton}
            onClick={startCountdown}
            disabled={!isCameraReady || countdown !== null}
          >
            {countdown !== null ? `📸 ${countdown}` : '📸 Capture'}
          </button>
        </div>
      </div>
      {capturedPhotos.length > 0 && (
        <div className={styles.gallery}>
          <h2 className={styles.galleryTitle}>Captured Moments</h2>
          <div className={styles.photoGrid}>
            {capturedPhotos.map((photo, index) => (
              <div key={index} className={styles.photoCard}>
                <img src={photo} alt={`Photo ${index + 1}`} className={styles.photo} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};