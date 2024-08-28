import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { CourseCard, CourseDetailsModal } from './components/courses';
import { LearningLinesAsInlineList } from './components/learning-lines';
import { Course } from '../types/courses'

import dataCurricula from './data/curricula.json';
import dataCurriculum202426 from './data/curriculum_2024_26.json';
import dataLearningLines from './data/learning_lines.json';
import originalDataSpecializations from './data/specializations.json';
import { Specialization } from '../types/specializations';

const dataSpecializations: Specialization[] = originalDataSpecializations;

function App() {
  const [dataCurriculum, setDataCurriculum] = useState(dataCurriculum202426);
  const [dataFilteredCurriculum, setDataFilteredCurriculum] = useState(dataCurriculum);
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [isDetailsModalOpen, setCourseDetailsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null | undefined>(null);

  const handleOpenCourseDetailsModal = useCallback((courseId: string) => {
    setSelectedCourse(dataCurriculum.courses.find(c => c.id === courseId));
    setCourseDetailsModalOpen(true);
  }, []);

  const handleCloseCourseDetailsModal = useCallback(() => {
    setCourseDetailsModalOpen(false);
  }, []);

  const handleChangeCurriculum = useCallback((ev: any) => {
    switch (ev.target.value) {
      case "Curriculum 2024-26": default: setDataCurriculum(dataCurriculum202426); break;
    }
  }, []);

  const handleChangeSpecialization = useCallback((ev: any) => {
    setSelectedSpecialization(ev.target.value);
  }, []);

  useEffect(() => {
    const filteredCurriculum = { ...dataCurriculum};  

    if (selectedSpecialization !== "all") {
      filteredCurriculum.courses = filteredCurriculum.courses.filter((course) => course.specializationCode === selectedSpecialization || course.specializationCode === undefined);
    }

    setDataFilteredCurriculum(filteredCurriculum);
  }, [dataCurriculum, selectedSpecialization]);
  
  return (
    <>
      <div className="App">
        <div className={`flex flex-row flex-wrap items-center justify-end p-2`}>
          <select onChange={(ev) => handleChangeCurriculum(ev)} className={`bg-gray-50 border border-ahs_blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-ahs_blue-500 dark:focus:border-ahs_blue-500 mx-2`}>
            {dataCurricula.map((curriculum, index) => <option key={index} value={curriculum.label}>{curriculum.label}</option>)}
          </select>
          <select onChange={(ev) => handleChangeSpecialization(ev)} className={`bg-gray-50 border border-ahs_blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-ahs_blue-500 dark:focus:border-ahs_blue-500 mx-2`}>
            <option value="all">Alle specialisaties</option>
            {dataSpecializations && dataSpecializations.length > 0 && dataSpecializations.map((specialization as Specialization) => <option key={specialization.code} value={specialization.code}>{specialization.name}</option>)}
          </select>
        </div>
        <CourseDetailsModal 
          isOpen={isDetailsModalOpen}
          onClose={handleCloseCourseDetailsModal}
          data={selectedCourse}
        />
        <main>
          <div className="curriculum">
            <header className="curriculum__header-container">
              <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold text-ahs_black-300">Curriculum Graduaat Digitale Vormgeving</h1>
            </header>
            <div className="curriculum__courses-container">
              <div className="header__year" style={{ gridColumnStart: "p1", gridColumnEnd: "span 4", gridRowStart: "year" }}><h1>1ste jaar</h1></div>
              <div className="header__year" style={{ gridColumnStart: "p5", gridColumnEnd: "span 4", gridRowStart: "year" }}><h1>2de jaar</h1></div>
              <div className="header__semester" style={{ gridColumnStart: "p1", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 1</div>
              <div className="header__semester" style={{ gridColumnStart: "p3", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 2</div>
              <div className="header__semester" style={{ gridColumnStart: "p5", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 3</div>
              <div className="header__semester" style={{ gridColumnStart: "p7", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 4</div>
              <div className="header__period" style={{ gridColumnStart: "p1", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 1</div>
              <div className="header__period" style={{ gridColumnStart: "p2", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 2</div>
              <div className="header__period" style={{ gridColumnStart: "p3", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 3</div>
              <div className="header__period" style={{ gridColumnStart: "p4", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 4</div>
              <div className="header__period" style={{ gridColumnStart: "p5", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 5</div>
              <div className="header__period" style={{ gridColumnStart: "p6", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 6</div>
              <div className="header__period" style={{ gridColumnStart: "p7", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 7</div>
              <div className="header__period" style={{ gridColumnStart: "p8", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 8</div>
              {dataFilteredCurriculum && dataFilteredCurriculum.courses && dataFilteredCurriculum.courses.map((course) => {
                const fData = dataFilteredCurriculum.courses.filter(c => c.learningLineCode === course.learningLineCode && c.semester === course.semester && (c.period === course.period || (typeof c.period === 'string' && c.period.indexOf(course.period.toString()) !== -1) || (typeof course.period === 'string' && course.period.indexOf(c.period.toString()) !== -1)));

                let nCollision = fData.findIndex(c => c.id === course.id);

                for(let i = 1; i <= nCollision; i++) {
                  if (typeof fData[i].period === 'string') {
                    if(typeof fData[i-1].period === 'string') {
                      if (fData[i].period !== fData[i-1].period) {
                        nCollision--;
                      }
                    } else {
                      if (fData[i].period.toString().indexOf(fData[i-1].period.toString()) === -1) {
                        nCollision--;
                      }
                    }
                  } else {
                    if(typeof fData[i-1].period === 'string') {
                      if (fData[i-1].period.toString().indexOf(fData[i].period.toString()) === -1) {
                        nCollision--;
                      }
                    } else {
                      if (fData[i].period !== fData[i-1].period) {
                        nCollision--;
                      }
                    }
                  }
                }

                return (
                  <CourseCard key={course.id} data={{ id: course.id, name: course.name, subName: course.subName, period: course.period, semester: 1, learningLineCode: course.learningLineCode, credits: course.credits, contactHoursPerWeek: course.contactHoursPerWeek, lecturers: course.lecturers, specializationCode: course.specializationCode }} onCourseDetailsOpen={handleOpenCourseDetailsModal} rIndex={nCollision} />
                )
              }
              )}
            </div>
            <footer className="curriculum__footer-container">
              <LearningLinesAsInlineList data={dataLearningLines} />
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
