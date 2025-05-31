import { useEffect, useRef, useState } from 'react';
import styles from './previews.module.css';
import { CommitDialog } from 'components/CommitDialog';
import { updateGithubContent } from 'api/githubContent';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { usePreviewStore } from 'store/PreviewStore';

interface JsonPreviewProps {
  url: string;
  path: string;
  sha: string;
}

export function JsonPreview({ url, path, sha }: JsonPreviewProps) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loading, setLoading, isEditing, setIsEditing, showCommitDialog, setShowCommitDialog } =
    usePreviewStore();
  const { listItems, setListItems } = useRepoBrowserStore();

  const isDataFetchLoading = loading && content === null;
  const isContentSaveLoading = loading && content !== null;

  const editedContent = useRef<string | null>(null);

  const onJsonUpdate = (updateSha: string) => {
    const updatedListItems = listItems.map(prevItem =>
      prevItem.path === path
        ? {
            ...prevItem,
            sha: updateSha,
          }
        : prevItem
    );
    setListItems(updatedListItems);
  };

  useEffect(() => {
    const fetchJson = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file content');
        const json = await response.json();
        const formatted = JSON.stringify(json, null, 2);
        setContent(formatted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load JSON');
      } finally {
        setLoading(false);
      }
    };

    fetchJson();
  }, [setContent, setError, setLoading, url]);

  const handleSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editContent = formData.get('edit-content') as string;
    if (!editContent) return;

    try {
      // Validate JSON before showing commit dialog
      JSON.parse(editContent);
      editedContent.current = editContent;
      setShowCommitDialog(true);
      setError(null);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
    }
  };

  const handleSaveConfirm = async (commitMessage: string) => {
    if (!editedContent.current || !commitMessage.trim()) return;
    if (editedContent.current === content) {
      setIsEditing(false);
      setShowCommitDialog(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const responseData = await updateGithubContent({
        path,
        content: editedContent.current,
        commitMessage,
        sha,
      });

      setContent(editedContent.current);
      setIsEditing(false);
      setShowCommitDialog(false);
      onJsonUpdate(responseData.sha);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowCommitDialog(false);
    setError(null);
  };

  if (isDataFetchLoading) return <div className={styles.loading}>Loading...</div>;
  if (error && !content) return <div className={styles.error}>{error}</div>;
  if (!content) return <div className={styles.error}>No content available</div>;

  return (
    <form onSubmit={handleSaveClick}>
      <div className={styles.jsonContainer}>
        <div className={styles.jsonHeaderAndErrorContainer}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.jsonHeader}>
            {!isEditing ? (
              <button onClick={handleEdit} className={styles.editButton}>
                Edit JSON
              </button>
            ) : (
              <div className={styles.editActions}>
                <button type="submit" className={styles.saveButton} disabled={isContentSaveLoading}>
                  {isContentSaveLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  className={styles.cancelButton}
                  disabled={isContentSaveLoading}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <textarea
            name="edit-content"
            defaultValue={content || ''}
            className={styles.jsonEditor}
            spellCheck={false}
          />
        ) : (
          <pre className={styles.jsonPreview}>
            <code>{content}</code>
          </pre>
        )}
        {showCommitDialog && (
          <CommitDialog
            isOpen={showCommitDialog}
            defaultMessage={`Update ${path}`}
            onConfirm={handleSaveConfirm}
            onCancel={() => setShowCommitDialog(false)}
            isLoading={isContentSaveLoading}
            errorMessage={error}
          />
        )}
      </div>
    </form>
  );
}
