import Link from 'next/link';
import Head from 'next/head';

const defaultEndPoint = 'https://rickandmortyapi.com/api/character';

export default function Character({ data }) {
  const { name, image, gender, location, origin, species, status } = data;
  console.log(data)
  return (
    <div className="container">
      <Head>
        <title>{ name } | Rick And Morty Wiki</title>
      </Head>

      <main>
        <h1 className="title">
        { name }
        </h1>

        <p>
          <Link href="/">
            <a>
              Back To All Characters
            </a>
          </Link>
        </p>

        <ul className="grid">
          <li className="card">
            <img src={image} alt={`${name}-thumb`} />
          </li>
          <li className="card">
            <ul>
              <li>
                <strong>Name: </strong> { name }
              </li>
              <li>
                <strong>Status:</strong> { status } 
              </li>
              <li>
                <strong>Gender:</strong> { gender } 
              </li>
              <li>
                <strong>Species:</strong> { species } 
              </li>
              <li>
                <strong>Location:</strong>{ location?.name } 
              </li>
              <li>
                <strong>Origin:</strong>{ origin?.name } 
              </li>
            </ul>
          </li>
          
        </ul>

      </main>

      
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndPoint}/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    }
  }
}