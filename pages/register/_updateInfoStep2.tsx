import { MeQuery } from 'generated/graphql';
import React from 'react';
import styles from 'styles/register.module.css';

interface Step2Props {
  handleChange: (e: any, field: string) => void;
  userInfo: MeQuery | undefined;
}
export const Step2: React.FC<Step2Props> = ({ handleChange, userInfo }) => {
  return (
    <section className={styles['step-container']}>
      Fugiat aute cillum anim mollit magna dolor. Nostrud adipisicing laboris
      quis dolore voluptate ex amet. Officia velit officia deserunt enim anim et
      adipisicing id laborum voluptate elit sit. Do ullamco cillum amet dolore
      eiusmod in proident nostrud esse culpa esse magna. Enim anim id
      reprehenderit officia laborum sunt. Amet nulla minim pariatur culpa quis
      nulla tempor do anim commodo adipisicing id.
    </section>
  );
};
