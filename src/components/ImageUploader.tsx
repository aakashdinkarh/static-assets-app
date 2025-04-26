import type { FormEvent} from 'react';
import { useState, useEffect } from 'react';
import { Image } from 'common/Image';
import type { GithubUploadResponse } from 'types/github';
import styles from './imageUploader.module.css';

interface ImageUploaderProps {
  onSuccess?: (response: GithubUploadResponse) => void;
  onError?: (error: string) => void;
}

export function ImageUploader({ onSuccess, onError }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [directory, setDirectory] = useState('');
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup previous preview URL when file changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Create preview URL for the selected file
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setFile(selectedFile);
      
      // Set default filename if none is set
      if (!filename) {
        setFilename(selectedFile.name);
      }
    } else {
      setPreviewUrl(null);
      setFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!file || !directory || !filename) {
      onError?.('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', directory);
      formData.append('filename', filename);

      const response = await fetch('/api/github/upload', {
        method: 'POST',
        body: formData,
      });

      const result: GithubUploadResponse = await response.json();

      if (result.success) {
        onSuccess?.(result);
        // Reset form
        setFile(null);
        setDirectory('');
        setFilename('');
        setPreviewUrl(null);
      } else {
        onError?.(result.message);
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fileInputWrapper}>
        <div className={styles.fileInputContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="file" className={styles.label}>
              Image File
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.input}
              required
            />
          </div>
        </div>
        <div className={styles.previewContainer}>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              className={styles.previewImage}
              width={300}
              height={200}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <span className={styles.previewPlaceholder}>
              Image preview will appear here
            </span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="directory" className={styles.label}>
          Directory Path
        </label>
        <input
          type="text"
          id="directory"
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
          placeholder="e.g., images/blog"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="filename" className={styles.label}>
          File Name
        </label>
        <input
          type="text"
          id="filename"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="e.g., header-image.jpg"
          className={styles.input}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </button>
    </form>
  );
} 