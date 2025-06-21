import { useState, useEffect } from 'react';
import { Image } from 'common/Image';
import type { GithubUploadResponse } from 'types/github';
import { uploadGithubContent } from 'api/githubContent';
import styles from './imageUploader.module.css';
import { PrimaryButton } from 'common/Button';
import { Input } from 'common/Input';
import { Form } from 'common/Form';

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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = async (data: Record<string, FormDataEntryValue>, form: HTMLFormElement) => {
    const file = data[FORM_FIELDS.file] as File;
    const directory = data[FORM_FIELDS.directory] as string;
    const filename = data[FORM_FIELDS.filename] as string;

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
    <Form onSubmit={handleSubmit} validateAll onError={setErrors} className={styles.form}>
      <div className={styles.fileInputWrapper}>
        <div className={styles.fileInputContainer}>
          <Input
            label="Image File"
            name={FORM_FIELDS.file}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            errorMessage={errors[FORM_FIELDS.file]}
            required
          />
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

      <Input
        label="Directory Path"
        name={FORM_FIELDS.directory}
        placeholder="e.g., images/blog"
        errorMessage={errors[FORM_FIELDS.directory]}
      />

      <Input
        label="File Name"
        name={FORM_FIELDS.filename}
        placeholder="e.g., header-image.jpg"
        errorMessage={errors[FORM_FIELDS.filename]}
      />

      <PrimaryButton type="submit" disabled={isLoading} style={submitButtonStyle}>
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </PrimaryButton>
    </Form>
  );
}

const submitButtonStyle = {
  justifyContent: 'center',
};
