// import React from 'react';
import PageStructure from '../../layout/PageStructure.js';
const Home = () => {
  return (
    <PageStructure>
      <main className="contact">
        <p>Please mail me @ home: </p>
        <p>
          <a
            href="mailto:adegboyegajosephdon@gmail.com"
            aria-label="Send an email to adegboyegajosephdon@gmail.com"
          >
            adegboyegajosephdon@gmail.com
          </a>
        </p>
      </main>
    </PageStructure>
  );
};

export default Home;
