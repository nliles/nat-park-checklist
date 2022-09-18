import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "actions";
import ReactModal from "react-modal";
import { State } from "reducers/types";
import { ModalComponents, ModalContentLabel } from "./types";
import styles from "./index.module.scss";

const Modal = () => {
  const modal = useSelector((state: State) => state.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const SpecificModal = ModalComponents[modal];

  return (
    <ReactModal
      appElement={document.getElementById("app") as HTMLElement}
      isOpen={!!modal}
      overlayClassName={styles.overlay}
      onRequestClose={closeModal}
      className={styles.modal}
      contentLabel={ModalContentLabel[modal]}
    >
      <div>
        <div className={styles.header}>
          <img
            className={styles.avatar}
            width={50}
            src="yosemite.svg"
            alt="Yosemite icon"
          />
          <button
            type="button"
            aria-label="Close Navigation"
            className={styles.close}
            onClick={closeModal}
          >
            <img src="close.svg" width={30} alt="close icon" />
          </button>
        </div>
        {modal && <SpecificModal />}
      </div>
    </ReactModal>
  );
};

export default Modal;
