import { useEffect, useRef, useState } from 'react';
import { CommitDialog } from 'components/CommitDialog';
import { updateGithubContent } from 'api/githubContent';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { usePreviewStore } from 'store/PreviewStore';
import { PrimaryButton, SecondaryButton } from 'common/Button';
import { useModalStore } from 'store/ModalStore';
import { ModalScreen } from 'store/ModalStore';
import { Textarea } from 'common/Textarea';
import styles from './previews.module.css';

interface TextContentPreviewProps {
  url: string;
  path: string;
  sha: string;
  contentValidation?: (content: string) => void;
}
const textareaStyle = { width: 'calc(90vw - 3rem)' };

export function TextContentPreview({ url, path, sha, contentValidation }: TextContentPreviewProps) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<{ preview?: string; commit?: string } | null>(null);

  const { loading, setLoading, isEditing, setIsEditing } = usePreviewStore();
  const { listItems, setListItems } = useRepoBrowserStore();
  const { modalScreen, openScreen, closeScreen, setModalActionsDisabled } = useModalStore();

  const isCommitModalOpen = !!modalScreen?.includes(ModalScreen.CommitModal);
  const closeCommitModal = () => closeScreen(ModalScreen.CommitModal);

  const isDataFetchLoading = loading && content === null;

  const editedContent = useRef<string | null>(null);

  const onContentUpdate = (updateSha: string) => {
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
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file content');
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError({ preview: err instanceof Error ? err.message : 'Failed to load content' });
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [setContent, setError, setLoading, url]);

  // Handle validation before showing commit modal
  const handleSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const editContent = formData.get('edit-content') as string;
    if (!editContent) return;

    try {
      contentValidation?.(editContent);
      editedContent.current = editContent;
      setError(null);
      openScreen(ModalScreen.CommitModal);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save changes';
      setError({ commit: 'Validation error: ' + errorMessage });
    }
  };

  const handleSaveConfirm = async (commitMessage: string) => {
    if (!editedContent.current || !commitMessage.trim()) return;

    if (editedContent.current === content) {
      setIsEditing(false);
      closeCommitModal();
      return;
    }

    setError(null);
    setModalActionsDisabled(true);
    try {
      const responseData = await updateGithubContent({
        path,
        content: editedContent.current,
        commitMessage,
        sha,
      });

      setContent(editedContent.current);
      setIsEditing(false);
      onContentUpdate(responseData.sha);
      closeCommitModal();
    } catch (err) {
      setError({ commit: err instanceof Error ? err.message : 'Failed to save changes' });
    } finally {
      setModalActionsDisabled(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  if (isDataFetchLoading) return <div className={styles.loading}>Loading...</div>;
  if (error?.preview && !content) return <div className={styles.error}>{error.preview}</div>;
  if (!content) return <div className={styles.error}>No content available</div>;

  return (
    <form onSubmit={handleSaveClick}>
      <div className={styles.textContentContainer}>
        <div className={styles.textContentHeaderAndErrorContainer}>
          {error?.preview && <div className={styles.error}>{error.preview}</div>}

          <div className={styles.textContentHeader}>
            {!isEditing ? (
              <PrimaryButton onClick={handleEdit}>Edit</PrimaryButton>
            ) : (
              <div className={styles.editActions}>
                <PrimaryButton type="submit">Save</PrimaryButton>
                <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <Textarea name="edit-content" defaultValue={content || ''} style={textareaStyle} />
        ) : (
          <pre className={styles.textContentPreview}>
            <code>{content}</code>
          </pre>
        )}

        {isCommitModalOpen && (
          <CommitDialog
            isOpen={isCommitModalOpen}
            defaultMessage={`Update ${path}`}
            onConfirm={handleSaveConfirm}
            onCancel={closeCommitModal}
            errorMessage={error?.commit}
          />
        )}
      </div>
    </form>
  );
}
