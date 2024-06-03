import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

const Modal = function Modal({open, onClose, children}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open && children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
