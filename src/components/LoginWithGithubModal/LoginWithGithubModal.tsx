import { ModalScreen, useModalStore } from 'store/ModalStore';
import { GITHUB_AUTH_URL } from 'constants/github';
import { Modal } from 'common/Modal';

export const LoginWithGithubModal = () => {
  const { modalScreen } = useModalStore();
  const isOpen = modalScreen === ModalScreen.LoginWithGithub;

  const primaryActionLabel = (
    <>
      <img
        src="https://aakashdinkarh.github.io/static_assets/images/svgs/github.svg"
        alt="GitHub"
        width={22}
      />
      Continue with GitHub
    </>
  );

  const primaryActionHandler = () => {
    window.location.href = GITHUB_AUTH_URL;
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Login with GitHub"
      primaryActionLabel={primaryActionLabel}
      secondaryActionLabel="Close"
      primaryActionHandler={primaryActionHandler}
    >
      Login with GitHub to authorize yourself to perform actions on your repositories.
    </Modal>
  );
};
