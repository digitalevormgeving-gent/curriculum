import { LearningLine } from '../../../types/learning-lines';

export type DetailsProps<T> = {
  className?: string;
  children?: React.ReactNode;
  data: T
};

export const LearningLinesAsInlineList = (props: DetailsProps<LearningLine[]>): JSX.Element => {
  return (
    <>
      <ul className="learninglines">
        {props.data.map((learningLine, index) => {
          return <li key={index} data-code={learningLine.code}>{learningLine.name}</li>
        })}
      </ul>
    </>
  );
}