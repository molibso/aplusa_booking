"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="py-12 flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
         

          {/* Weiterführende Links */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="font-bold uppercase mb-4 text-black dark:text-white text-sm tracking-wide">WEITERFÜHRENDE LINKS</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li><a href="https://www.aplusa.de/" className="hover:text-primary">A+A Messe</a></li>
              <li><a href="https://molibso.com/de/orthopaedietechnik/" className="hover:text-primary">Orthopädietechnik </a></li>
              <li><a href="https://molibso.com/de/industrie/" className="hover:text-primary">Industrie </a></li>
              <li><a href="https://molibso.com/de/fit-trailer/" className="hover:text-primary">Fit-Trailer </a></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="font-bold uppercase mb-4 text-black dark:text-white text-sm tracking-wide">KONTAKT</h4>
            <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <p  >molibso Entwicklungs- und Vertriebs GmbH</p>
              <p>Karl-Benz-Str. 1</p>
              <p>40764 Langenfeld</p>
              <p><a href="tel:+4921732070940" className="hover:text-primary">Telefon: +49 (0)2173 / 207 094 0</a></p>
              <p><a href="mailto:mail@molibso.com" className="hover:text-primary">E-Mail: mail@molibso.com</a></p>
              <p><a href="https://molibso.com" className="hover:text-primary">Website</a></p>
              <p><a href="https://molibso.com/de/impressum/" className="hover:text-primary">Impressum </a></p>
              <p><a href="https://molibso.com/de/datenschutz/" className="hover:text-primary">Datenschutz </a></p>
            </div>
          </div>

          {/* Unternehmen */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="font-bold uppercase mb-4 text-black dark:text-white text-sm tracking-wide">UNTERNEHMEN</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li><a href="https://molibso.com/de/anfahrt-kontakt/" className="hover:text-primary">Anfahrt & Kontakt</a></li>
              <li><a href="https://molibso.com/de/unternehmen/" className="hover:text-primary">Über uns</a></li>
              <li><a href="https://molibso.com/de/vertriebspartner/" className="hover:text-primary">Vertriebspartner</a></li>
              <li><a href="https://molibso.com/de/blog/" className="hover:text-primary">Blog</a></li>
              <li><a href="https://molibso.com/newsletter" className="hover:text-primary">Newsletter</a></li>
            </ul>
          </div>
          
         </div>
         <div className="mt-7 flex items-center justify-center gap-6 xl:mt-0">
          <ul className="flex items-center gap-5">
                <li>
                  <a href="https://www.facebook.com/molibso/" aria-label="social icon">
                    <svg
      className="fill-[#D1D8E0] transition-all duration-300 hover:fill-[#29c3ec]"
      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_48_1499)">
                        <path
                          d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1499">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
               <a href="https://www.instagram.com/molibso/" aria-label="Instagram icon">
                 <svg
      className="fill-[#D1D8E0] transition-all duration-300 hover:fill-[#29c3ec]"
      width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <g clipPath="url(#clip0_48_1502)">
                      <path
                       d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM20 17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17Z"
                       fill=""
                     />
                      <path
                       d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
                       fill=""
                     />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="" />
                   </g>
                   <defs>
                     <clipPath id="clip0_48_1502">
                       <rect width="24" height="24" fill="white" />
                     </clipPath>
                   </defs>
                 </svg>
               </a>
              </li>
              <li>
  <a href="https://de.linkedin.com/company/molibsogmbh" aria-label="linkedin icon">
    <svg
      className="fill-[#D1D8E0] transition-all duration-300 hover:fill-[#29c3ec]"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        fill=""
      />
    </svg>
  </a>
</li>

               </ul>
          
          </div>

      
        <div className="flex flex-col items-center justify-center border-t border-stroke py-4 mt-4">
          <p className="text-m text-gray-500">&copy; {new Date().getFullYear()} molibso. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
