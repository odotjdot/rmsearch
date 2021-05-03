import Link from 'next/link';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

const defaultEndPoint = 'https://rickandmortyapi.com/api/character';

export default function Character({ data }) {
  const { name, image, gender, location, origin, species, status } = data;
  return (
    <div className="container">
      <Head>
        <title>{ name } | Rick And Morty Wiki</title>
      </Head>

      <main>
        <h1 className="title">
        { name }
        </h1>

        <Row>
        <Col className="search justify-content-center">
          <Link href="/">
            <a>
              Back To All Characters
            </a>
          </Link>
        </Col>
        </Row>

        <ul className="card_single">
          <li className="card">
            <img src={image} alt={`${name}-thumb`} />
          
          
            <ul className="description">
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
                <strong>Location:</strong> { location?.name } 
              </li>
              <li>
                <strong>Origin:</strong> { origin?.name } 
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