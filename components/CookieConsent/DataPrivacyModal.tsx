import { Modal, Box, Typography, Button } from "@mui/material";

const DataPrivacyModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" component="h2" sx={styles.title}>
          Datenschutzerklärung
        </Typography>

        <Typography variant="body1" sx={styles.section}>
          Sofern innerhalb des Internetangebotes die Möglichkeit zur Eingabe
          persönlicher oder geschäftlicher Daten (Emailadressen, Namen,
          Anschriften) besteht, so erfolgt die Preisgabe dieser Daten seitens
          des Nutzers auf ausdrücklich freiwilliger Basis. Die Inanspruchnahme
          und Bezahlung aller angebotenen Dienste ist – soweit technisch möglich
          und zumutbar – auch ohne Angabe solcher Daten bzw. unter Angabe
          anonymisierter Daten oder eines Pseudonyms gestattet.
        </Typography>

        <Typography variant="body1" sx={styles.section}>
          Die Nutzung der im Rahmen des Impressums oder vergleichbarer Angaben
          veröffentlichten Kontaktdaten wie Postanschriften, Telefon- und
          Faxnummern sowie Emailadressen durch Dritte zur Übersendung von nicht
          ausdrücklich angeforderten Informationen ist nicht gestattet.
          Rechtliche Schritte gegen die Versender von sogenannten Spam-Mails bei
          Verstössen gegen dieses Verbot sind ausdrücklich vorbehalten.
        </Typography>

        <Typography variant="h6" component="h3" sx={styles.subTitle}>
          Cookies und Dienste auf unserer Website
        </Typography>

        <Typography variant="body1" sx={styles.section}>
          Unsere Website verwendet nur notwendige Technologien und Dienste, um
          ihren sicheren Betrieb zu gewährleisten:
        </Typography>

        <Box sx={styles.listContainer}>
          <Typography variant="body2" sx={styles.listItem}>
            <b>1. Google Fonts (lokal gehostet):</b>
            <br />
            <b>Zweck:</b> Stellt Schriftarten bereit und gewährleistet ein
            einheitliches Erscheinungsbild.
            <br />
            <b>Datenübertragung:</b> Es erfolgt keine Datenübertragung an
            externe Server.
          </Typography>

          <Typography variant="body2" sx={styles.listItem}>
            <b>2. Google reCAPTCHA:</b>
            <br />
            <b>Zweck:</b> Schützt die Website vor Spam und Missbrauch durch
            automatisierte Zugriffe.
            <br />
            <b>Datenübertragung:</b> Es werden Daten wie Ihre IP-Adresse an
            Google (USA) übertragen.
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ backgroundColor: "#29c3ec" }}
          >
            Schließen
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: "absolute" as const,
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

const styles = {
  title: {
    fontWeight: "bold",
    textAlign: "center",
    mb: 2,
  },
  subTitle: {
    fontWeight: "bold",
    mt: 3,
    mb: 1,
  },
  section: {
    mb: 2,
    lineHeight: 1.7,
  },
  listContainer: {
    mt: 2,
    mb: 2,
  },
  listItem: {
    mb: 2,
    lineHeight: 1.6,
  },
};

export default DataPrivacyModal;
