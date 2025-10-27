"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";  

const Modal = ({ isOpen, onClose }) => {
  const router = useRouter();  

  const handleClose = () => {
    onClose();  
    router.push("/");  
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById("modal-container");
      if (modal && !modal.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <motion.div
        id="modal-container"
        className="bg-white rounded-lg p-8 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="text-2xl font-semibold text-center" style={{ textDecoration: "underline", textDecorationColor: "#29c3ec" }}>
        Vielen Dank für Ihre Anmeldung!
        </h2>
        <div className="mt-4 text-center text-l space-y-2">
          <p>Hallo,</p>
          <p>vielen Dank für Ihre Anmeldung für eine Ganganalyse an unserem Stand auf der OST-Messe.</p>
          <p>Sie erhalten Ihren Gutschein für ein Tagesticket der Messe innerhalb der nächsten 48 Stunden von uns per Mail zugeschickt.</p>
          <p>Sollten Sie Fragen haben, schreiben Sie gerne eine Mail an <a href="mailto:marketing@molibso.com" className="text-[#29c3ec] underline">marketing@molibso.com</a></p>
          <p>Wir freuen uns, auf Ihren Besuch!</p>
          <p>Dynamische Grüße</p>
          <p>Ihr molibso-Team</p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-[#29c3ec] text-white px-6 py-2 rounded-full"
            onClick={handleClose}
          >
            Schließen
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
