// src/components/FilePreview/previews/PDFPreview.tsx
import { useEffect, useState } from 'react';
import { CACHE_CONTROL_HEADER } from 'constants/headers.constant';
import { getCacheControlMessage } from 'utils/getCacheControlMessage.util';
import styles from './previews.module.css';

interface PDFPreviewProps {
  url: string;
  path: string;
}

export function PDFPreview({ url, path }: PDFPreviewProps) {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string | null> | null>(
    null
  );

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Accept: 'application/pdf',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch PDF');
        const blob = await response.blob();

        const pdfBlob = new Blob([blob], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);
        setPdfBlobUrl(blobUrl);

        setResponseHeaders({
          [CACHE_CONTROL_HEADER]: response.headers.get(CACHE_CONTROL_HEADER),
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load PDF');
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [url]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [pdfBlobUrl]);

  if (loading) return <div className={styles.loading}>Loading PDF...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  const cacheControlHeaderValue = responseHeaders?.[CACHE_CONTROL_HEADER];

  return (
    <div>
      {cacheControlHeaderValue && (
        <p className={styles.warn}>{getCacheControlMessage(cacheControlHeaderValue)}</p>
      )}

      {pdfBlobUrl && (
        <object
          data={pdfBlobUrl}
          type="application/pdf"
          className={styles.pdfViewer}
          title={`PDF Preview: ${path}`}
        >
          <p>
            Your browser does not support PDF preview.
            <a href={url} target="_blank" rel="noopener noreferrer">
              Click here to open the PDF
            </a>
          </p>
        </object>
      )}
    </div>
  );
}
