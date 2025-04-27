import { useState, useEffect } from 'react';
import styles from './previews.module.css';

interface JsonPreviewProps {
  url: string;
}

export function JsonPreview({ url }: JsonPreviewProps) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJson = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file content');
        const json = await response.json();
        setContent(JSON.stringify(json, null, 2));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load JSON');
      } finally {
        setLoading(false);
      }
    };

    fetchJson();
  }, [url]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!content) return <div className={styles.error}>No content available</div>;

  return (
    <pre className={styles.jsonPreview}>
      <code>{content}</code>
    </pre>
  );
} 