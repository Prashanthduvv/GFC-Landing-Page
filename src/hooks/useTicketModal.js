import { useState, useEffect } from "react";

export function useTicketModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true);
    };
    
    window.addEventListener('openTicketModal', handleOpenModal);
    return () => window.removeEventListener('openTicketModal', handleOpenModal);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
}