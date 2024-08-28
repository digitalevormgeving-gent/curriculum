import { FaRegCalendarAlt } from "react-icons/fa";
import { LuTrophy } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";

import { Course } from '../../../types/courses';
import { Modal } from '../modals'

import dataLearningLines from '../../data/learning_lines.json';
import lecturers from '../../data/lecturers.json';

export type DetailsModalProps<T> = {
  isOpen: boolean;
  onClose: () => void;
  data?: T | null | undefined,
};

/**
 * Renders a modal component displaying the details of a course.
 *
 * @param isOpen - A boolean indicating whether the modal is open or not.
 * @param onClose - A function to handle the close event of the modal.
 * @param data - The data object containing the details of the course.
 * @returns The JSX element representing the course details modal.
 */
export const CourseDetailsModal = ({isOpen, onClose, data}: DetailsModalProps<Course>): JSX.Element => {
  return (
    <>
      <Modal
        hasCloseBtn={true}
        isOpen={isOpen}
        onClose={onClose}
        className={`${data ? `ll--${data.learningLineCode}` : ''}`}
        >
        {!!data &&
        <>
          <p className={`course-details__learningline`} data-code={data.learningLineCode}>{dataLearningLines.find(ll => ll.code === data.learningLineCode)?.name}</p>
          <h1 className={`course-details__name`}>{data.name}</h1>
          {data.tags && data.tags.length > 0 &&
            <ul className={`course-details__tags`}>
              {data.tags.map((tag, index) => {
                return (
                  <li key={index}>#{tag.toUpperCase()}</li>
                )
              })}
            </ul> 
          }     
          <ul className={`course-details__meta`}>
            <li className={`course-details__meta-period`}><FaRegCalendarAlt className={`ri`} />Periode {data.period} | Semester {data.semester}</li>
            <li className={`course-details__meta-credits`}><LuTrophy className={`ri`}/>{data.credits} studiepunten</li>
            <li className={`course-details__meta-hoursperweek`}><FaRegClock className={`ri`}/>{data.contactHoursPerWeek} u/week</li>
          </ul>
          <section>
            <h2 className={`course-details__lecturers-title`}>Docenten</h2>
            <ul className={`course-details__lecturers`}>
              {data.lecturers && data.lecturers.map((lecturer, index) => {
                return (
                  <li key={index}>{lecturers.find(l => l.code === lecturer)?.name} ({lecturer})</li>
                )
              })}
            </ul>
          </section>
        </>
        }
      </Modal>
    </>
  );
}