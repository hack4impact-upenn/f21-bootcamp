import { useQuery } from 'react-query';
import api from '../api';

function IndexPage() {
  // Example API request with caching, fetch list of users.
  // See https://react-query.tanstack.com/ for documentation on react-query.
  const { isLoading, error, data } = useQuery('newbies', () =>
    api.get('/api/newbies').then((res) => {
      return res.data.data;
    })
  );

  return (
    <div className="container center">
      <header className="hero">
        <div className="hero-body">
          <h1 className="title">Hello world: Index</h1>
          <h2 className="subtitle">
            A list of newbies retrieved from <code>/api/newbies</code>.
          </h2>
        </div>
      </header>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        <p style={{ color: 'red' }}>An error occurred! {error}</p>
      ) : (
        <div className="is-flex is-flex-wrap-wrap">
          {data.map((newbie) => (
            <article key={newbie.userID} className="box m-2">
              <p className="has-text-weight-bold">
                {newbie.firstName} {newbie.lastName}
              </p>
              <p>Graduation Year: {newbie.gradYear}</p>
              <p>Hometown: {newbie.hometown}</p>
              <p>Fun fact: {newbie.funFact}</p>
            </article>
          ))}
        </div>
      )}
      <footer className="section">
        To be filled in with the actual app, soon! :)
      </footer>
    </div>
  );
}

export default IndexPage;
