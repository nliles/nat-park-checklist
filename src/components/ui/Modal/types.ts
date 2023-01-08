import { ReactNode } from 'react';

export type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  modalLabel: string;
}
