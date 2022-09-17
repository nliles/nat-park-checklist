import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "actions";
import { State } from "reducers/types";
import { ModalComponents } from "./types";
import styles from "./index.module.scss";

const ModalRoot = () => {
  const modal = useSelector((state: State) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modal) {
      document.body.classList.add("showModal");
    } else {
      document.body.classList.remove("showModal");
    }
    return () => document.body.classList.remove("showModal");
  }, [modal]);

  if (!modal) {
    return null;
  }

  const SpecificModal = ModalComponents[modal];

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <img
            className={styles.avatar}
            width={50}
            src="yosemite.svg"
            alt="logo"
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
        <SpecificModal />
      </div>
    </div>
  );
};

export default ModalRoot;
