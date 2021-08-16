import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
      setIsOpen(!isOpen);    
  }

  return {toggle, isOpen}

};

export default useModal;
