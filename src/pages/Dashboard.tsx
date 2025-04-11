import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

function Dashboard() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const btnGroupRef = useRef(null);
  const facilitiesRef = useRef(null);
  const facilityCardsRef = useRef<HTMLDivElement[]>([]); // For individual cards
  const navigate=useNavigate()

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.from(headingRef.current, { opacity: 0, y: -50 })
      .from(paraRef.current, { opacity: 0, y: 30 }, '-=0.5')
      .from(btnGroupRef.current, { opacity: 0, scale: 0.9 }, '-=0.4');

    // ScrollTrigger animation for facilities
    gsap.from(facilityCardsRef.current, {
      scrollTrigger: {
        trigger: facilitiesRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reset',
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background grid */}
      <div className="absolute inset-0 z-[-2] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 flex flex-col items-center px-4 py-24">
        <div className="max-w-3xl text-center">
          {/* Heading */}
          <h1
            ref={headingRef}
            className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-white"
          >
            Your Offline Payment app
            <span className="text-sky-400 px-2">OfflinePay</span>
          </h1>

          {/* Description */}
          <p ref={paraRef} className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            OfflinePay is a next-generation blockchain-powered payment solution designed to empower
            users with secure, fast, and reliable transactions—even without an internet
            connection. OfflinePay ensures that your payments never pause.
          </p>

          {/* Buttons */}
          <div ref={btnGroupRef} className="flex flex-wrap justify-center gap-4 mb-16">
            <button onClick={()=>navigate('/home')} className="rounded-lg px-6 py-3 font-medium bg-sky-400 text-slate-900 hover:bg-sky-300">
              Get Started
            </button>
            <button className="rounded-lg border px-6 py-3 font-medium border-slate-700 text-white hover:bg-slate-700">
              Learn More
            </button>
          </div>

          {/* Facilities Section */}
          <div ref={facilitiesRef} className="text-white">
            <h2 className="text-2xl font-semibold mb-6">Facilities we provide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                '🔗 Blockchain Security',
                '📶 Offline Transactions',
                '🔔 Real-time Sync',
                '💸 Currency Conversion',
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-slate-800 rounded-xl shadow-xl opacity-0"
                  ref={(el) => (facilityCardsRef.current[i] = el!)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
