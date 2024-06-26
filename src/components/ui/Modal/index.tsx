import { useEffect, useState, ReactNode } from "react";
import ReactModal from "react-modal";
import { createPortal } from "react-dom";
import Close from "components/icons/Close";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  modalLabel: string;
};

const Modal = ({ children, onClose, modalLabel }: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>();

  useEffect(() => {
    const el = document.getElementById("modal-root");
    setModalRoot(el);
  }, []);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <ReactModal
      appElement={modalRoot}
      isOpen
      overlayClassName={styles.overlay}
      onRequestClose={onClose}
      className={styles.modal}
      contentLabel={modalLabel}
    >
      <div>
        <div className={styles.header}>
          <img
            className={styles.avatar}
            width={50}
            height={50}
            src="yosemite.svg"
            alt="Yosemite icon"
          />
          <button
            type="button"
            aria-label="Close Navigation"
            className={styles.close}
            onClick={onClose}
          >
            <Close />
          </button>
        </div>
        {children}
      </div>
    </ReactModal>,
    modalRoot
  );
};

export default Modal;
