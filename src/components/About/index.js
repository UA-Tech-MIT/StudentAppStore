import React from 'react';
import styles from '../App/styles.scss';

function About() {
  return (
    <section>
    <h1 className={styles.header}>About Our Team</h1>
    <p className={styles.paragraph}> MITSS Is an initaive from the UA Technology Sytems group. As a student
        App store and launchpad, the goal of It serves to be the quintessential
        MIT Student homepage. Our missions is to increase the visibility and 
        accessibility of new student innovation making on campus as the campus
        App store we all deserve. 
    </p>
    </section>
  );
}

export default About;
