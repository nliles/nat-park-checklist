const renderModal = () => {
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  const body = global.document.querySelector("body");
  body?.appendChild(modalRoot);
};

export default renderModal;
