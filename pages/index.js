import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const defaultEndPoint = 'https://rickandmortyapi.com/api/character';

export async function getServerSideProps() {
  const res = await fetch(defaultEndPoint);
  const data = await res.json();

  return {
    props: {
      data,
    }
  }
}

export default function Home({ data }) {

  const { info, results: defaultResults = [] } = data;
  const [ results, updateResults ] = useState(defaultResults);
  const [page, updatePage] = useState({ 
    ...info,
    current: defaultEndPoint,
  })

  const { current } = page;

  console.log(page)

  useEffect(()=> {
    if ( current === defaultEndPoint ) return;

    async function request() {
      const result = await fetch(current)
      const nextData = await result.json();

      updatePage({
        current,
        ...nextData.info,
      });

      if ( !nextData.info?.prev ) {
        updateResults(nextData.results);
        return
      }

      updateResults(prev => {
        console.log('prev =======' , prev)
        return [
          ...prev,
          ...nextData.results,
        ]
      });
    }

    request();

  }, [current]);

  function handleLoadMore() {
    updatePage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    })
  }

  return (
    <div className="container">
      <Head>
        <title>Rick And Morty Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Rick And Morty Wiki
        </h1>





        <ul className="grid">
          {results.map(result => {
            const { id, name, image } = result;

            return (
              <li className="card" key={id}>
                <Link href="https://nextjs.org/docs">
                  <a>
                    
                    <img src={image} alt={`${name}-thumb`}/>
                    <h3>{name}</h3>
                  </a>
                </Link>
              </li>
            )
          })}
          
        </ul>
        <button onClick={handleLoadMore}>Load More</button>
      </main>

      <footer>

      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;

          
        }
        .grid li {
          list-style: none;
        }
        .grid ul {
          margin: 0;
          padding: 0;
        }

        .card {
          margin: 1rem;
          flex-basis: 39%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .card img {
          width: 100%;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
