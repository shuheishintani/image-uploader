import { useState, useEffect } from 'react';
import { storage, db } from '@/config/firebase';

const useStorage = (file: File | null) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<any>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!file) {
      return;
    }
    const storageRef = storage.ref(file.name);
    const collectionRef = db.collection('images');

    const unsubscribe = storageRef.put(file).on(
      'state_changed',
      snap => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      err => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = Date.now();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
