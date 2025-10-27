"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden  ">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-32.5 mt-6">
           
            <div className="w-full md:w-1/2">
               <h2 id="ueber-molibso" className="mb-4.5 mt-6 text-3xl font-medium text-black dark:text-white" style={{fontWeight:'700 '}}>
               molibso – seit zehn Jahren Menschen besser bewegen   {"   "}
          
              </h2>
              <div className="mb-4.5 text-lg text-black dark:text-white" style={{fontWeight:400}}>
                <p className="mb-4">
                  molibso steht für intelligente und zukunftsweisende Lösungen in der Gang- und Bewegungsanalyse. Unsere dyneos-Messsysteme vereinen modernste Sensortechnologie und KI-gestützte Algorithmen mit einer benutzerfreundlichen Anwendung in Echtzeit.
                </p>
                
                <p className="mb-4">
                  Das Ergebnis: präzise Analyseergebnisse, die Orthopädietechnikern, Fachhändlern und Industriepartnern eine fundierte Basis für Beratung, Versorgung und Verkauf liefern. So entsteht ein nahtloses Beratungserlebnis, bei dem Technologie und fachliche Expertise optimal ineinandergreifen.
                </p>
                
                <p className="mb-4">
                  Seit unserer Gründung 2015 haben wir uns vom Start-up zum international tätigen Anbieter entwickelt. Dank kontinuierlicher Weiterentwicklung unserer Produkte heben wir die Digitalisierung der Bewegungsanalyse konsequent auf ein neues Level.
                </p>
              </div>
               
 
              <div className="w-full mb-8">
            <a href="#support">
             </a>
          </div>
             </div>
             <div className="animate_right w-full md:w-1/2">
              <div className="relative 2xl:-mr-7.5">
          
                <div className="relative aspect-[750/500] w-full">
                  <Image
                  className="shadow-solid-l dark:hidden border-4 border-[#01abca]" 
                   src="/images/analysis.png"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block border-4 border-[#01abca]"
                    src="/images/analysis.png"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
           
          </div>
        </div>
       </section>
    </>
  );
};

export default Hero;
