import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './styles.module.css';

interface Photo {
  id: number;
  src: string;
  title: string;
  year: string;
}

const photos: Photo[] = [
  { id: 1, src: 'https://picsum.photos/400/500?random=1', title: 'Childhood', year: '1995' },
  { id: 2, src: 'https://picsum.photos/400/600?random=2', title: 'School Days', year: '2005' },
  { id: 3, src: 'https://picsum.photos/500/400?random=3', title: 'Adventures', year: '2010' },
  { id: 4, src: 'https://picsum.photos/400/500?random=4', title: 'Graduation', year: '2015' },
  { id: 5, src: 'https://picsum.photos/500/600?random=5', title: 'Travel', year: '2018' },
  { id: 6, src: 'https://picsum.photos/400/400?random=6', title: 'Celebration', year: '2020' },
  { id: 7, src: 'https://picsum.photos/500/500?random=7', title: 'Family', year: '2022' },
  { id: 8, src: 'https://picsum.photos/400/600?random=8', title: 'Now', year: '2023' },
];

export const GalleryPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    itemsRef.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.05 },
          index * 0.05
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (selectedPhoto && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }
      );
    }
  }, [selectedPhoto]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          setSelectedPhoto(null);
          document.body.style.overflow = 'auto';
        },
      });
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}>Memory Gallery</h1>
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className={styles.card}
            onClick={() => handlePhotoClick(photo)}
          >
            <img src={photo.src} alt={photo.title} className={styles.image} loading="lazy" />
            <div className={styles.overlay}>
              <h3 className={styles.photoTitle}>{photo.title}</h3>
              <p className={styles.photoYear}>{photo.year}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div ref={modalRef} className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              ×
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.title} className={styles.modalImage} />
            <h2 className={styles.modalTitle}>{selectedPhoto.title}</h2>
            <p className={styles.modalYear}>{selectedPhoto.year}</p>
          </div>
        </div>
      )}
    </div>
  );
};
