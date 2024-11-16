import React, { useState } from 'react';
import accordionData from '../accordionData';

const Accordion = ({showCanvas}) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (category) => {
    // If the clicked category is already active, close it. Otherwise, open it.
    setActiveAccordion(activeAccordion === category ? null : category);
  };

  return (

    
    <div className="w-full" style={{borderBottom: `2px solid ${showCanvas ? '#000' : '#fff'}  width: '100%'`}}>
      {Object.keys(accordionData).map((category, index) => (
        <div key={index} id={`accordion-${category}`} data-accordion="collapse" className="w-full" style={{borderBottom: `1px solid ${showCanvas ? '#000' : '#fff'}`}}>
          <h2 id={`accordion-${category}-heading`}>
            <button 
              type="button" 
              className={` flex items-center justify-between w-full p-5 font-medium rtl:text-right focus:ring-4 focus:ring-white-200 dark:focus:ring-white-800 hover:bg-white-100 dark:hover:bg-white-800 gap-3 ${
                showCanvas ? 'text-black' : 'text-white'
              }`}
              onClick={() => handleAccordionToggle(category)}
              aria-expanded={activeAccordion === category}
              aria-controls={`accordion-${category}-body`}
            >
              <span>{category}</span>
              <div className={`w-11 h-8 border-2 border-current rounded-[15px] flex items-center justify-center transition-transform duration-300 ${
                showCanvas ? 'border-black' : 'border-white'
              }`}>
                <span className="text-md font-medium transition-opacity duration-300" style={{
                  opacity: activeAccordion === category ? 1 : 0,
                  position: 'absolute'
                }}>-</span>
                <span className="text-md font-medium transition-opacity duration-300" style={{
                  opacity: activeAccordion === category ? 0 : 1,
                  position: 'absolute'
                }}>+</span>
              </div>
            </button>
          </h2>
          <div 
            id={`accordion-${category}-body`} 
            className={`${activeAccordion === category ? 'block' : 'hidden'}`}
            aria-labelledby={`accordion-${category}-heading`}
          >
            <div >
              <ul className={`ps-4 ${showCanvas ? 'text-black' : 'text-white'} `} >
                {accordionData[category].map((item, itemIndex) => (
                  <li className={`pb-[10px] pt-[10px] ${showCanvas ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'} transition-colors duration-300`} style={{borderTop: `1px solid ${showCanvas ? '#E62826' : '#202020'}`}} key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
