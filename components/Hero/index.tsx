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
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <h1 className="w-full text-start py-4 text-4xl font-bold text-black dark:text-white  ">
        Registrieren Sie sich für eine Ganganalyse auf der A+A Messe 
an unserem Stand G16-04 (im Freigelände vor der Halle 16)

      </h1>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-32.5 mt-6">
            <div className="w-full md:w-1/2">
               <h2 id="dyneos-sani" className="mb-4.5 mt-6 text-3xl font-medium text-black dark:text-white" style={{fontWeight:'700 '}}>
               molibso dyneos SANI bietet Ihnen:    {"   "}
          
              </h2>
              <div className="mb-4.5 text-lg text-black dark:text-white" style={{fontWeight:400}}>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2"> einen neuen, digitalen Workflow für Ihre Einlagenberatung und -verkauf</p>

                   </li>
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2">eine vollumfängliche Vernetzung zu verschiedenen Schnittstellen</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2">langfristige Kundenbindung Dank präziser und ganzheitlich gestützter KI-Analyse</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2">eine endkundenfreundliche visuelle Aufbereitung samt stichpunktartigem Analysebericht</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2">eine kontinuierliche Inhouse-Weiterentwicklung der Software inkl. kostenloser Updates</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2">individualisierte Customer Journeys</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2">ein förderfähiges Konzept - sprechen Sie uns gerne darauf an!</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#29c3ec] mr-3 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <p className="mb-2">Schuhe so intelligent verkaufen wie nie, mit dem neuen molibso Shoe Score</p>
                  </li>
                </ul>
              </div>
               
 
              <div className="w-full mb-8">
            <a href="#support">
              <button
                className="w-full bg-[#29c3ec] hover:bg-[#20a8c4] text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 ease-in-out shadow-lg hover:shadow-xl"
              >
                Registrieren
              </button>
            </a>
          </div>
             </div>

            <div className="animate_right w-full md:w-1/2">
              <div className="relative 2xl:-mr-7.5">
          
                <div className="relative aspect-[750/500] w-full">
                  <Image
                  className="shadow-solid-l dark:hidden border-4 border-[#01abca]" 
                   src="/images/anniversary_hero.jpg"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block border-4 border-[#01abca]"
                    src="/images/anniversary_hero.jpg"
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
