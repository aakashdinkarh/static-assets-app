import { ModalScreen, useModalStore } from 'store/ModalStore';
import { GITHUB_AUTH_URL, githubCodeCheckIntervalData } from 'constants/github';
import { Modal } from 'common/Modal';
import { Image } from 'common/Image';
import { GITHUB_LOGO } from 'constants/image.constant';
import { useGithubUserInfoStore } from 'store/GithubUserInfoStore';

export const LoginWithGithubModal = () => {
  const { modalScreen } = useModalStore();
  const isOpen = modalScreen === ModalScreen.LoginWithGithub;
  const { userLoginInProgress, setUserLoginInProgress } = useGithubUserInfoStore();

  const primaryActionLabel = (
    <>
      <Image src={GITHUB_LOGO} alt="GitHub" width={22} />
      {userLoginInProgress ? 'Logging in...' : 'Continue with GitHub'}
    </>
  );

  const primaryActionHandler = () => {
    if (userLoginInProgress) return;

    window.open(GITHUB_AUTH_URL, '_blank');
    setUserLoginInProgress(true);
  };

  const onClose = () => {
    setUserLoginInProgress(false);
    clearInterval(githubCodeCheckIntervalData.intervalId);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Login with GitHub"
      primaryActionLabel={primaryActionLabel}
      secondaryActionLabel="Close"
      primaryActionHandler={primaryActionHandler}
      onClose={onClose}
    >
      Login with GitHub to authorize yourself to perform actions on this repository.
    </Modal>
  );
};
