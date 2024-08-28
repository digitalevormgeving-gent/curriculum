import { useCallback } from 'react';

import { Course } from '../../../types/courses';
import dataLecturers from '../../data/lecturers.json';

export type CardProps<T> = {
  className?: string;
  data: T;
  onCourseDetailsOpen: Function;
  rIndex?: number;
};

const getGridColumnStart = (period: number | string): string => {
  if (typeof period === "number") {
    return `p${period}`;
  } else {
    const periodes = period.split("+");
    return `p${periodes[0]}`;
  }
}

const getGridColumnEnd = (period: number | string): string => {
  if (typeof period === "number") {
    return `p${period + 1}`;
  } else {
    const periodes = period.split("+");
    return `p${parseInt(periodes[1]) + 1}`;
  }
}

const getLecturer = (lecturerCode: string): string => {
  const lecturer = dataLecturers.find(l => l.code === lecturerCode);
  if (lecturer) {
    return lecturer.name;
  } else {
    return "Nog niet gekend";
  }
}

/**
 * Renders a course card component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the component.
 * @param {Course} props.data - The course data.
 * @param {Function} props.onCourseDetailsOpen - The function to handle opening course details.
 * @returns {JSX.Element} The rendered course card component.
 */
export const CourseCard = ({className, data, onCourseDetailsOpen, rIndex}: CardProps<Course>): JSX.Element => {
  const handleOnClick = useCallback(() => {
    if (onCourseDetailsOpen) {
      onCourseDetailsOpen(data.id);
    }
  }, []);

  return (
    <>
      <div className={`course course--${data.learningLineCode}${className ? ` ${className}` : ''}`} style={{ gridColumnStart: getGridColumnStart(data.period), gridColumnEnd: getGridColumnEnd(data.period), gridRowStart: `${data.learningLineCode}${rIndex && rIndex > 0 ? `_${rIndex}` : ''}` }} data-specializationcode={data.specializationCode} onClick={handleOnClick}>
        <header className="course__header">
          <span className="course__header-icon"></span>
          <span className="course__lecturers">
            {data.lecturers && data.lecturers.map((lecturerCode, index) => {
              return <span className="lecturer" key={index}><abbr title={getLecturer(lecturerCode)}>{lecturerCode}</abbr></span>
            })}
          </span>
        </header>
        <div className="course__content">
          <h3 className="course__name">{data.name}</h3>
          <h4 className="course__sub-name">{data.subName}</h4>
        </div>
        <footer className="course__footer">
          <span className="course__credits">{data.credits}<abbr title="studiepunten">sp</abbr></span>
          <span className="course__contact-hours-per-week">{data.contactHoursPerWeek}<abbr title="uren per week">u/w</abbr></span>
        </footer>
      </div>
    </>
  );
}