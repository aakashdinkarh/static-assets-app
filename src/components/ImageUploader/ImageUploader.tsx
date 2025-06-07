import type { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { Image } from 'common/Image';
import type { GithubUploadResponse } from 'types/github';
import { uploadGithubContent } from 'api/githubContent';
import styles from './imageUploader.module.css';

interface ImageUploaderProps {
  onSuccess?: (response: GithubUploadResponse) => void;
  onError?: (error: string) => void;
}

const FORM_FIELDS = {
  file: 'file',
  directory: 'directory',
  filename: 'filename',
} as const;

const changeFilenameInput = (form: HTMLFormElement | null, fileName?: string) => {
  if (!form) return;

  // @ts-expect-error - form elements are not typed
  const filenameInput = form.elements[FORM_FIELDS.filename] as HTMLInputElement;
  if (filenameInput) {
    filenameInput.value = fileName || '';
  }
};

export function ImageUploader({ onSuccess, onError }: ImageUploaderProps) {
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

    try {
      changeFilenameInput(e.target.form, selectedFile?.name);
    } catch {}

    if (selectedFile) {
      // Create preview URL for the selected file
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const file = formData.get(FORM_FIELDS.file) as File;
    const directory = formData.get(FORM_FIELDS.directory) as string;
    const filename = formData.get(FORM_FIELDS.filename) as string;

    if (!file || !directory || !filename) {
      onError?.('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const result: GithubUploadResponse = await uploadGithubContent({
        file,
        directory,
        filename,
        commitMessage: `Upload ${filename}`,
      });
      onSuccess?.(result);
      form.reset();
      setPreviewUrl(null);
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
            <label htmlFor={FORM_FIELDS.file} className={styles.label}>
              Image File
            </label>
            <input
              type="file"
              id={FORM_FIELDS.file}
              name={FORM_FIELDS.file}
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
            <span className={styles.previewPlaceholder}>Image preview will appear here</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={FORM_FIELDS.directory} className={styles.label}>
          Directory Path
        </label>
        <input
          type="text"
          id={FORM_FIELDS.directory}
          name={FORM_FIELDS.directory}
          placeholder="e.g., images/blog"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={FORM_FIELDS.filename} className={styles.label}>
          File Name
        </label>
        <input
          type="text"
          id={FORM_FIELDS.filename}
          name={FORM_FIELDS.filename}
          placeholder="e.g., header-image.jpg"
          className={styles.input}
          required
        />
      </div>

      <button type="submit" disabled={isLoading} className={styles.button}>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </button>
    </form>
  );
}
