import { ModalScreen, useModalStore } from 'store/ModalStore';
import { GITHUB_AUTH_URL } from 'constants/github';
import { Modal } from 'common/Modal';
import { Image } from 'common/Image';
import { GITHUB_LOGO } from 'constants/image.constant';

export const LoginWithGithubModal = () => {
  const { modalScreen } = useModalStore();
  const isOpen = modalScreen === ModalScreen.LoginWithGithub;

  const primaryActionLabel = (
    <>
      <Image src={GITHUB_LOGO} alt="GitHub" width={22} />
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
      Login with GitHub to authorize yourself to perform actions on this repository.
    </Modal>
  );
};
