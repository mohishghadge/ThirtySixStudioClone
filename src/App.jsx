import Canvas from './Canvas'
import './index.css' 
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Accordion from './components/Accordion';
import { Circ, Expo } from "gsap/all";

function App() {

  // const [showCanvas, setShowCanvas] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  // const growingRef = useRef(null);
  const growingSpan = useRef(null);
  const cursorRef = useRef(null);

  


  useEffect(()=>{
    const locomotiveScroll = new LocomotiveScroll();
    
  },[])

 

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          // Set initial position and make visible
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
            scale: 0,
            backgroundColor: "#fd2c2a",
            display: "block"
          });

          // Animate the circle expansion
          gsap.to(growingSpan.current, {
            scale: 100,
            duration: 1.2,
            ease: Expo.easeInOut,
            onComplete: () => {
              // Change body background after circle expands
              gsap.to("body", {
                color: "#000",
                backgroundColor: "#fd2c2a",
                duration: 0.1
              });
            }
          });
        } else {
          // Reverse animation for closing
          gsap.to("body", {
            color: "#fff", 
            backgroundColor: "#000",
            duration: 1.2,
            ease: Expo.easeInOut
          });

          gsap.to(growingSpan.current, {
            scale: 0,
            duration: 0.8,
            ease: Expo.easeInOut
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener('click', handleClick);

    return () => {
      headingElement.removeEventListener('click', handleClick);
    }
    
  },[])  

  useEffect(() => {
    const cursor = cursorRef.current;
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);
  
  return (
    <>

      <div 
        className="cursor fixed w-[20px] h-[20px] bg-white rounded-[10px] pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
        ref={cursorRef}
      ></div>
     
      <span
        ref={growingSpan} 
        className="growing rounded-full block fixed bg-[#fd2c2a] w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2"
        style={{display: 'none'}}
      ></span>

      <div className='w-full relative min-h-screen '>
      {showCanvas &&
            data[0].map((canvasdets,index)=>(
             <Canvas key={index} details={canvasdets}/>
           ))
              }
        <div className='w-full relative z-[1] h-screen'>
          <nav className="p-3 w-full flex justify-between z-[1]" style={{borderBottom: `2px solid ${showCanvas ? '#E62826' : '#202020'}`}}>
          <div  className='brand  text-[15px] font-normal font-normal'>Thirtysixstudio</div>
          <div className="flex gap-8 justify-center">
            {["What we do", "Who we are", "How we give back", "Talk to us"]
            .map((link, index) => (
                <a 
                  key={index}
                  href={`#${link.toLowerCase()}`} 
                  className={`text-md transition-colors ${showCanvas ? 'hover:text-[#fff]' : 'hover:text-[#E62826]'}`}>
                  {link}
                  
                </a>
            ))}
          </div>
          </nav>
          <div className='textcontainer px-[25%]  py-[2%]'>
            <div className='text w-[55%]'>
                <h3 className='text-4xl leading-[1.3] font-normal '>
                At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
                </h3>
                <p className='mt-10 text-sm w-[90%] font-normal'>
                  We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
                </p>
                <p className='mt-10 text-md w-[100%] font-normal'>
                    Scroll
                </p>
            </div>
          </div>
          <div className='overflow-x-hidden'>
          <div 
            className='w-full h-screen w-full '
            onMouseEnter={() => {
              gsap.to(cursorRef.current, {
                width: "70px",
                height: "70px", 
                duration: 0.3,
                backgroundImage: "url('https://thirtysixstudio.com/peppers/pepperA/71.png')",
                backgroundSize: "cover",
                backgroundColor: showCanvas ? '#fff' : '#E62826',
                borderRadius: "50%"
              });
            }}
            onMouseLeave={() => {
              gsap.to(cursorRef.current, {
                width: "20px",
                height: "20px",
                duration: 0.3,
                backgroundImage: "none",
                borderRadius: "50%"
              });
            }}
          >
            <h1 ref={headingref} className='text-[18rem] pl-5'>Thirtysixstudio</h1>
          </div>
          </div>
        </div>
      </div>

     

      <div className='w-full h-screen relative' style={{borderTop: `2px solid ${showCanvas ? '#E62826' : '#202020'}`}}>
        {showCanvas &&
            data[1].map((canvasdets,index)=>(
             <Canvas key={index} details={canvasdets}/>
           ))
              }
              
        <div className='text flex relative  flex-row justify-between px-[25%] py-[4%]'>
          <div className='w-[30%]'>
           <h3
             className={`text-lg leading-[1.3] font-semibold inline-flex items-center p-4 ${showCanvas ? "text-black" : "bg-black text-white"}`}>
              01 <span className="dash w-6 h-[2px] bg-current mx-2"></span> WHAT WE DO
          </h3>
          </div>
          <div className='w-[33%]'>
            <h3 className='text-4xl leading-[1.1] font-light w-[160%]'>
              We aim to revolutionize digital production in the advertising space, bringing your ideas to life.            
            </h3>
            <p className='mt-[12rem] text-md font-normal w-[135%]'>
              As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver seamless digital work.
            </p>
            <p className='mt-5 text-md font-normal w-[135%]'>
              Our commitment to creativity, innovation, and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.
            </p>
          </div>
        </div>
        <div style={{borderTop: `2px solid ${showCanvas ? '#E62826' : '#202020'}`}}>

          <div className='px-[25%] py-[4%]'> 
            <h1  className='mt-10 text-[16px]  w-[100%] font-[400]' >OUR SERVICES</h1>

            <p className='mt-[5rem] text-4xl font-light leading-[1.3]'>
                We provide captivating design, interactive animations, advanced usability, reliable code, and immaculate project coordination. Whether you need a campaign built from scratch or assistance at a specific phase, we’ve got you covered.
            </p>
          </div>
        </div>


        
          <div className='w-full h-screen relative' style={{borderTop: `2px solid ${showCanvas ? '#E62826' : '#202020'}`}} >
          {showCanvas &&
            data[0].map((canvasdets,index)=>(
             <Canvas key={index} details={canvasdets}/>
           ))
              }
             
          <div className='px-[25%] py-[4%]'> 
            <Accordion showCanvas={showCanvas}  />
           </div>
              
          </div>
          <footer className="w-full py-8 px-[25%]" style={{borderTop: `2px solid ${showCanvas ? '#E62826' : '#202020'}`}}>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className={`text-md ${showCanvas ? 'text-black' : 'text-white'}`}>
         Mohish Ghadge
        </p>
        <p className={`text-lg ${showCanvas ? 'text-black' : 'text-white'}`}>
          Thirtysixstudio Clone
        </p>
      </div>
    </footer>


      </div>


   
    
    </>
  )
}

export default App