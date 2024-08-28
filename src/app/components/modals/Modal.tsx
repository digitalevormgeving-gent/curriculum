import { useEffect, useRef } from "react";
import { FaRegWindowClose } from "react-icons/fa";

type ModalProps = {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className: string;
};

const Modal = ({ isOpen, hasCloseBtn, onClose, children, className }: ModalProps): JSX.Element => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
    return () => modalRef.current?.close();
  }, [isOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog className={`modal${className ? ` ${className}` : ''}`} ref={modalRef} onKeyDown={handleKeyDown}>
      {hasCloseBtn && (
        <button className="modal-close-btn" onClick={handleCloseModal}>
          <FaRegWindowClose />
        </button>
      )}
      {children}
    </dialog>
  );
}

export default Modal;