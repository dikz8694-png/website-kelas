import React, { useEffect, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Lazy load komponen mapel
const Senin = React.lazy(() => import("../components/Mapel/Senin"));
const Selasa = React.lazy(() => import("../components/Mapel/Selasa"));
const Rabu = React.lazy(() => import("../components/Mapel/Rabu"));
const Kamis = React.lazy(() => import("../components/Mapel/Kamis"));
const Jumat = React.lazy(() => import("../components/Mapel/Jumat"));

const Schedule = () => {
  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const todayIndex = new Date().getDay();
  const currentDay = daysOfWeek[todayIndex];

  useEffect(() => {
    AOS.init();
  }, []);

  // DATA PIKET: tetap sama setiap minggu
  const piketGroup = [
    ["Aufa", "Sohib", "Arif", "Aditya", "Adinda", "Zhahara", " Vhiola"],      // Senin
    ["Sani", "Vhania", "Fauzan", "Farel", "Izam", "Clara", "Ari"],   // Selasa
    ["Reha", "Salwa", "Citra", "Amirah", "Azka", "Syahat"],      // Rabu
    ["Kaisar", "Meysa", "Sasmita", "Gea", "Naura S", "Adit P"],     // Kamis
    ["Keyza", "Naura M", "Nindy", "Asyifa", "Akmal", "Raffa"],    // Jumat
  ];

  const dayComponents = [
    null,   // 0: Minggu
    Senin,  // 1
    Selasa, // 2
    Rabu,   // 3
    Kamis,  // 4
    Jumat,  // 5
    null    // 6: Sabtu
  ];

  const TodayComponent = dayComponents[todayIndex];
  const currentPiketNames = (todayIndex >= 1 && todayIndex <= 5) ? piketGroup[todayIndex - 1] : [];

  return (
    <>
      {/* Jadwal Mapel */}
      <div className="lg:flex lg:justify-center lg:gap-32 lg:mb-10 lg:mt-16">
        <div className="text-white flex flex-col justify-center items-center mt-8 md:mt-3 overflow-y-hidden">
          <div
            className="text-2xl font-medium mb-5"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            {currentDay}
          </div>
          <div data-aos="fade-up" data-aos-duration="400">
            <Suspense fallback={<p className="opacity-50">Loading...</p>}>
              {TodayComponent ? (
                <TodayComponent />
              ) : (
                <p className="opacity-50">Liburr😋</p>
              )}
            </Suspense>
          </div>
        </div>
      </div>

      {/* Jadwal Piket */}
      <div className="text-white flex flex-col justify-center items-center mt-8 lg:mt-0 overflow-y-hidden">
        <div
          className="text-2xl font-medium mb-5 text-center"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          Piket
        </div>
        {currentPiketNames && currentPiketNames.length > 0 ? (
          currentPiketNames.map((piketName, index) => (
            <div
              key={index}
              className={`border-t-2 border-white flex justify-center py-[0.50rem] w-72 px-3 ${
                index === currentPiketNames.length - 1 ? "border-b-2" : ""
              }`}
              data-aos="fade-up"
              data-aos-duration={600 + index * 100}
            >
              <div className="text-base font-medium">{piketName}</div>
            </div>
          ))
        ) : (
          <p className="opacity-50">Liburr😋</p>
        )}
      </div>
    </>
  );
};

export default Schedule;
