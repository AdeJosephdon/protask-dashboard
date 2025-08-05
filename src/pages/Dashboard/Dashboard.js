// import React from 'react';
import PageStructure from '../../layout/PageStructure.js';
const Dashboard = () => {
  return (
    <PageStructure>
      <main className="contact">
        <aside className="contact__aside"> </aside>
        <section className="contact__section">
          <h2>Dashboard</h2>
          <p>Welcome to your dashboard!</p>
          {/* Additional dashboard content can go here */}
        </section>
      </main>
    </PageStructure>
  );
};

export default Dashboard;
