import PageStructure from '../../layout/PageStructure';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <PageStructure>
      <main className="excluded-page">
        Help page not included in design go to your{' '}
        <Link
          to={'/dashboard'}
          style={{
            color: 'var(--button-orange-background-color)',
            fontSize: '3rem',
          }}
        >
          Dashboard
        </Link>
      </main>
    </PageStructure>
  );
};

export default Help;
