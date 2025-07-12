import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setToLocalStorage } from 'utils/storage.util';
import { STORAGE_KEYS } from 'constants/storage.constant';

export const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const [isComplete, setIsComplete] = useState(false);
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      setToLocalStorage(STORAGE_KEYS.GITHUB_CODE, code);
      setIsComplete(true);

      // Try to close, but don't rely on it
      try {
        window.close();
      } catch (e) {
        // Ignore errors - window.close() will fail in most cases
      }
    }
  }, [code]);

  if (!code) {
    return <h1 style={{ textAlign: 'center', marginTop: '100px' }}>Login Failed</h1>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login Successful!</h1>
      {isComplete && <p>You can now close this window and return to the main application.</p>}
    </div>
  );
};
