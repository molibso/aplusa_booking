"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/de";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const Contact = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const [formData, setFormData] = useState({
    salutation: "",
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
    company_name: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const eventDate1Str = process.env.NEXT_PUBLIC_EVENT_DATE_1 || "2025-11-04";
  const eventDate2Str = process.env.NEXT_PUBLIC_EVENT_DATE_2 || "2025-11-05";
  const eventDate3Str = process.env.NEXT_PUBLIC_EVENT_DATE_3 || "2025-11-06";
  const eventDate4Str = process.env.NEXT_PUBLIC_EVENT_DATE_4 || "2025-11-07";

  const eventName1 = process.env.NEXT_PUBLIC_EVENT_NAME_1 || "aplusa1";
  const eventName2 = process.env.NEXT_PUBLIC_EVENT_NAME_2 || "aplusa2";
  const eventName3 = process.env.NEXT_PUBLIC_EVENT_NAME_3 || "aplusa3";
  const eventName4 = process.env.NEXT_PUBLIC_EVENT_NAME_4 || "aplusa4";

  const eventDate1 = dayjs(eventDate1Str);
  const eventDate2 = dayjs(eventDate2Str);
  const eventDate3 = dayjs(eventDate3Str);
  const eventDate4 = dayjs(eventDate4Str);
  const [selectedDate, setSelectedDate] = useState(eventDate1);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = checkbox1 || checkbox2 || checkbox3;
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    let eventName = eventName1;
    if (selectedDate.isSame(eventDate1, "day")) {
      eventName = eventName1;
    } else if (selectedDate.isSame(eventDate2, "day")) {
      eventName = eventName2;
    } else if (selectedDate.isSame(eventDate3, "day")) {
      eventName = eventName3;
    } else if (selectedDate.isSame(eventDate4, "day")) {
      eventName = eventName4;
    }

    const fetchAppointments = async () => {
      try {
        const apiUrl = `/api/events?event=${eventName}`;
        console.log('Fetching appointments from:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch appointments: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        console.log('Appointments data received:', data);
        sessionStorage.setItem("appointments", JSON.stringify(data));
        const eventDate = selectedDate.format("YYYY-MM-DD");
        setAppointments({
          [eventDate]: data.map((a: any) => a.timeslot),
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [selectedDate, hasMounted, eventDate1Str, eventDate2Str, eventDate3Str, eventDate4Str, eventName1, eventName2, eventName3, eventName4]);

  if (!hasMounted) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid || !captchaToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const apiUrl2 = `${process.env.NEXT_PUBLIC_BASE_URL}?s=${process.env.NEXT_PUBLIC_SYSTEM_TOKEN}`;

    try {
      // Create a copy of formData and exclude the specified fields for BUNERT
      const { salutation, company_name, ...filteredFormData } = formData;
      
      // Prepare data for both APIs
      const bunertData = { ...filteredFormData, captchaToken };
      
      // Map form data to match MongoDB schema
      const saveBookingData = {
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        time: selectedAppointment,
        bookingDate: selectedDate?.format("YYYY-MM-DD"),
        company_name: formData.company_name,
        salutation: formData.salutation,
        captchaToken: captchaToken
      };
      
      // Send to both APIs simultaneously
      const saveBookingUrl = process.env.NEXT_PUBLIC_SAVE_BOOKING;
      
      const apiPromises = [
        fetch(apiUrl2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          },
          body: JSON.stringify(bunertData),
        })
      ];

      // Only add SAVE_BOOKING API call if URL is defined
      if (saveBookingUrl) {
        apiPromises.push(
          fetch(saveBookingUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            },
            body: JSON.stringify(saveBookingData),
          })
        );
      }

      const responses = await Promise.allSettled(apiPromises);
      const [bunertResponse, saveBookingResponse] = responses;

      // Check BUNERT response
      if (bunertResponse.status === 'fulfilled' && bunertResponse.value.ok) {
        console.log("BUNERT API: Success");
      } else {
        console.error("BUNERT API: Failed", bunertResponse.status === 'rejected' ? bunertResponse.reason : bunertResponse.value.status);
      }

      // Check SAVE_BOOKING response (only if it was called)
      if (saveBookingUrl) {
        if (saveBookingResponse.status === 'fulfilled' && saveBookingResponse.value.ok) {
          console.log("SAVE_BOOKING API: Success");
        } else {
          console.error("SAVE_BOOKING API: Failed", saveBookingResponse.status === 'rejected' ? saveBookingResponse.reason : saveBookingResponse.value.status);
        }
      }

      // Show success modal if at least one API succeeded
      const bunertSuccess = bunertResponse.status === 'fulfilled' && bunertResponse.value.ok;
      const saveBookingSuccess = saveBookingUrl ? (saveBookingResponse.status === 'fulfilled' && saveBookingResponse.value.ok) : true;
      
      if (bunertSuccess || saveBookingSuccess) {
        setIsModalOpen(true);
      } else {
        alert("Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      salutation: "",
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
      company_name: "",
    });
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
    setCaptchaToken(null);
    router.push("/");

  };

  return (
    <>
      <section
        id="support"
        className="px-4 md:px-8 2xl:px-0"
        style={{
          backgroundColor: "white",
          marginBottom: "22px",
          marginTop: "-100px",
        }}
      >
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="./images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

           <div className="flex flex-col flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20 mt-40">
            
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="order-1 w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:order-1 md:w-2/5 lg:w-1/2 xl:p-15"
            >
              <h2
                id="messe-infos"
                className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#29c3ec",
                }}
              >
               Über die A+A-Messe

              </h2>
              <p className="mb-2 text-base text-black dark:text-white">
              Die Messe für Arbeitsschutz und Arbeitssicherheit – kurz A + A – ist eine internationale Fachmesse mit einem angegliederten internationalen Kongress für Sicherheit und Gesundheit bei der Arbeit. 
              </p>
              <p className="mb-4 text-base text-black dark:text-white">
              Sie wird seit 1954 regelmäßig in einem 2-jährigen Turnus durchgeführt und findet in diesem Jahr zum 38. Mal auf einer Fläche von mehr als 159.100 m² statt.
              </p>
              <p className="mb-4 text-base text-black dark:text-white">
              Neben uns erwarten dich vom 4. bis 7. November täglich zwischen 9 und 18 Uhr knapp 2.200 Unternehmen aus 58 Ländern, was mehr als 62.000 Besucher aus 40 Nationen anzieht.
              </p>
              <div className="space-y-3">
                {/* <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-[#29c3ec]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-black dark:text-white">24. & 25. Oktober 2025</span>
                </div> */}
                {/* <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-[#29c3ec]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-black dark:text-white">Freitag von 9 bis 18 Uhr, Samstag von 9 bis 17 Uhr</span>
                </div> */}
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-[#29c3ec]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-black dark:text-white"> Stand G16-04 (im Freigelände vor der Halle 16)                          </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-[#29c3ec]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                  <a href="https://www.aplusa.de/" className="text-[#29c3ec] underline text-base">A+A 2025 -- Weltleitmesse für sicheres und gesundes Arbeiten                  /</a>
                </div>
              </div>
            </motion.div>

            <motion.div
               variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2 w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:order-2 md:w-3/5 lg:w-1/2 xl:p-15"
            >
              <h2
                id="registrieren"
                className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#29c3ec",
                }}
              >
                Registrieren
              </h2>

              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <div className="mb-7.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                      Anrede <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleInputChange}
                      className={`w-full border-b border-stroke bg-transparent pb-3.5 ${
                        !formData.salutation && "border-red-500"
                      }`}
                      required
                    >
                      <option value="">Bitte wählen</option>
                      <option value="Herr">Herr</option>
                      <option value="Frau">Frau</option>
                    </select>
                  </div>

                  <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Vorname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="Vorname"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className={`w-full border-b border-stroke bg-transparent pb-3.5 ${
                          !formData.first_name && "border-red-500"
                        }`}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Nachname <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Nachname"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className={`w-full border-b border-stroke bg-transparent pb-3.5 ${
                          !formData.last_name && "border-red-500"
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-7.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                      E-Mail-Adresse <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-Mail-Adresse"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full border-b border-stroke bg-transparent pb-3.5 ${
                        !formData.email && "border-red-500"
                      }`}
                      required
                    />
                  </div>

                  <div className="mb-7.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                      Firmenname <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      placeholder="Firmenname"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      className={`w-full border-b border-stroke bg-transparent pb-3.5 ${
                        !formData.company_name && "border-red-500"
                      }`}
                      required
                    />
                  </div>

             

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      aria-label="Weiter"
                      style={{ backgroundColor: "#29c3ec" }}
                      className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white"
                    >
                      Weiter
                      <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z" fill="white"/>
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div className="p-4">
                  <h3 className="mb-4 text-center text-xl text-black dark:text-white sm:text-2xl">
                    Bitte wählen Sie Ihr passendes Zeitfenster für den {selectedDate ? selectedDate.locale("de").format("D. MMMM YYYY") : ""}
                  </h3>

                  <div className="mt-4 flex flex-col items-start justify-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-12">
                    {/* Calendar */}
                    <div className="w-full flex-shrink-0 sm:w-auto">
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DateCalendar
                          value={selectedDate}
                          onChange={(date) => {
                            if (!date) return;
                            if (
                              date.isSame(eventDate1, "day") ||
                              date.isSame(eventDate2, "day") ||
                              date.isSame(eventDate3, "day") ||
                              date.isSame(eventDate4, "day")
                            ) {
                              setSelectedDate(date);
                              setSelectedAppointment(null);
                            }
                          }}
                          sx={{
                            width: "100%",
                            maxWidth: "320px",
                            "& .Mui-selected": {
                              backgroundColor: "#0080b3 !important",
                              color: "white",
                            },
                          }}
                          shouldDisableDate={(date) => {
                            return !(
                              date.isSame(eventDate1, "day") ||
                              date.isSame(eventDate2, "day") ||
                              date.isSame(eventDate3, "day") ||
                              date.isSame(eventDate4, "day")
                            );
                          }}
                        />
                      </LocalizationProvider>
                    </div>

                    {/* Appointments list */}
                    <div className="flex w-full max-w-[360px] flex-col gap-2 sm:mr-4 sm:w-auto">
                      {selectedDate && (
                        <div className="flex max-h-[360px] flex-col overflow-y-auto pr-2">
                          {appointments[selectedDate.format("YYYY-MM-DD")]?.length ? (
                            appointments[selectedDate.format("YYYY-MM-DD")].map((time, index) => (
                              <div
                                key={index}
                                onClick={() => setSelectedAppointment(time)}
                                className={`mt-2 w-full cursor-pointer rounded-lg p-2 text-center text-white text-sm shadow-md sm:w-48 ${
                                  selectedAppointment === time ? "bg-[#29c3ec]" : "bg-[#00000073]"
                                }`}
                              >
                                {time}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500">Keine Termine verfügbar</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={prevStep}
                      style={{ backgroundColor: "#29c3ec" }}
                      className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white"
                    >
                      Zurück
                    </button>
                    <button
                      onClick={nextStep}
                      style={{ backgroundColor: "#29c3ec" }}
                      disabled={!selectedDate || !selectedAppointment}
                      className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white ${
                        !selectedDate || !selectedAppointment ? "cursor-not-allowed bg-gray-500" : ""
                      }`}
                    >
                      Weiter
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6 rounded-lg border bg-gray-100 p-6 text-center dark:bg-gray-800">
                    <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">Ausgewählter Termin:</h4>
                    <p className="text-md text-gray-700 dark:text-gray-300">
                      {selectedDate ? selectedDate.locale("de").format("dddd, D. MMMM YYYY") : "Kein Datum ausgewählt"}
                      {selectedAppointment ? ` - ${selectedAppointment}` : ""}
                    </p>
                    <p className="mt-2 text-md text-gray-700 dark:text-gray-300">
                      Ort: Koelnmesse
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={checkbox3}
                        onChange={() => setCheckbox3(!checkbox3)}
                        className="mr-3 h-5 w-5 flex-shrink-0 align-middle"
                      />
                      <label className="align-middle text-sm">
                        Ja, ich möchte ein kostenloses Messeticket erhalten und einen Termin für eine Ganganalyse im Fit Trailer buchen.
                                            </label>
                    </div>

                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={checkbox1}
                        onChange={() => setCheckbox1(!checkbox1)}
                        className="mr-3 h-5 w-5 flex-shrink-0 align-middle"
                      />
                      <label className="align-middle text-sm">
                      Ja, ich möchte mich für den Newsletter von molibso registrieren, um über Veranstaltungen, Neuerungen sowie besondere Aktionen und Angebote informiert zu werden.                      </label>
                    </div>

                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={checkbox2}
                        onChange={() => setCheckbox2(!checkbox2)}
                        className="mr-3 h-5 w-5 flex-shrink-0 align-middle"
                      />
                      <label className="align-middle text-sm">
                      Hiermit bestätige ich, die Allgemeinen Geschäftsbedingungen gelesen, verstanden und akzeptiert zu haben.                      </label>
                    </div>

                    <div className="mb-4">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={handleCaptchaChange}
                      />
                    </div>

                    <div className="flex w-full items-center justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        style={{ backgroundColor: "#29c3ec" }}
                        className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white"
                      >
                        Zurück
                      </button>

                      <button
                        type="submit"
                        aria-label="Bestätigen"
                        disabled={!isFormValid || !captchaToken || isSubmitting}
                        style={{ backgroundColor: "#29c3ec" }}
                        className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-medium text-white ${
                          isFormValid && captchaToken && !isSubmitting ? "hover:bg-dark bg-black" : "cursor-not-allowed bg-gray-500"
                        }`}
                      >
                        {isSubmitting ? "Wird verarbeitet..." : "Bestätigen"}
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Disclaimer Section */}
              {/* <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                <h3
                  className="mb-4 text-xl font-semibold text-black dark:text-white"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#29c3ec",
                }}
              >
                Haftungsausschluss
                </h3>
                <p className="text-sm text-black dark:text-white">
                  Meine Daten werden ausschließlich zu diesem Zweck erfasst, elektronisch gespeichert sowie verwendet und nicht an Dritte weitergegeben. Diese Einwilligung kann ich jederzeit per E-Mail an <a href="mailto:molibso@dyneos.de" className="underline text-[#29c3ec]">molibso@dyneos.de</a> widerrufen.
                </p>
              </div> */}
            </motion.div>
          </div>
           
       
        
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Contact;
