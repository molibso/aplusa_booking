"use client";
import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import DataPrivacyModal from "./DataPrivacyModal";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    const consent = sessionStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem("cookieConsent", "necessaryOnly");
    setIsVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const handleClosePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  if (!isVisible) return null;
  return (
    <div style={styles.container}>
      <p style={styles.headerText}>Wir schützen Ihre Privatsphäre</p>
      <p style={styles.bodyText}>
        Unsere Website verwendet notwendige Technologien und Dienste, um deren Betrieb und Sicherheit zu gewährleisten. Dazu gehört der Dienst Google reCAPTCHA, der vor Spam und Missbrauch schützt. Es werden dabei Daten wie Ihre IP-Adresse an Google übertragen. Ohne diesen Dienst kann die Website nicht sicher betrieben werden.
        Wir setzen keine weiteren Cookies ein. Weitere Informationen finden Sie in unserer{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={handleOpenPrivacyModal}
        >
          <b>Datenschutzerklärung</b>
        </span>
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={handleOpenModal} style={styles.declineButton}>
          Details anzeigen
        </button>
        <button onClick={handleAccept} style={styles.acceptButton}>
          Verstanden
        </button>
      </div>

      {/* Existing Cookie Details Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyles}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ fontSize: "1.8rem", fontWeight: "bold", textAlign: "center" }}
          >
            Cookie-Einstellungen
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Einleitung:</b> <br />
            Unsere Website verwendet ausschließlich notwendige Technologien, um sicherzustellen, dass sie ordnungsgemäß funktioniert und vor Spam oder Missbrauch geschützt ist. Hier finden Sie detaillierte Informationen zu den verwendeten Diensten.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Notwendige Cookies
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ lineHeight: "2" }}
          >
            <b> -Google reCAPTCHA: </b> <br />
            1. <b>Zweck:</b> Schützt die Website vor Spam und Missbrauch durch automatisierte Zugriffe. Es überprüft, ob die Interaktionen von einer echten Person stammen. <br />
            2. <b>Datenverarbeitung:</b> Es werden Daten wie Ihre IP-Adresse und möglicherweise Nutzungsdaten an Google (USA) übertragen. <br />
            3. <b>Rechtsgrundlage:</b> Berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Ohne diesen Dienst können wir die Sicherheit unserer Website nicht gewährleisten.
            <br />
            4. <b>Weitere Informationen:</b>{" "}
            <a href="https://policies.google.com/privacy?hl=de">
              {" "}
              <b>Datenschutzerklärung von Google.</b>{" "}
            </a>{" "}
            <br />
            <b> -Widerrufsmöglichkeit: </b> <br />
            Da wir keine optionalen Dienste oder Cookies einsetzen, ist ein Widerruf nicht erforderlich. Für weitere Fragen können Sie uns jederzeit kontaktieren.
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{ marginTop: 2, backgroundColor: "#29c3ec" }}
            >
              Schließen
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Privacy Modal */}
      <DataPrivacyModal
        open={isPrivacyModalOpen}
        onClose={handleClosePrivacyModal}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed" as const,
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#313030",
    color: "#fff",
    padding: "20px 30px",
    borderRadius: "10px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    maxWidth: "100%",
    zIndex: 1000,
    opacity: 0.95,
  },
  headerText: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    margin: "0 0 10px 0",
    textAlign: "center" as const,
  },
  bodyText: {
    margin: "0 0 20px 0",
    fontSize: "15px",
    lineHeight: "1.5",
    textAlign: "center" as const,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center",
    gap: "10px",
    width: "100%",
  },
  acceptButton: {
    backgroundColor: "#29c3ec",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold" as const,
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  declineButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold" as const,
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",  
  maxHeight: "60vh",  
   overflowY: "auto",  
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default CookieConsent;