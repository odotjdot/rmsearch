import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form'



const defaultEndPoint = 'https://rickandmortyapi.com/api/character';

export default function Home({ data }) {

  const { info, results: defaultResults = [] } = data;
  const [ results, updateResults ] = useState(defaultResults);
  const [page, updatePage] = useState({ 
    ...info,
    current: defaultEndPoint,
  })

  const { current } = page;

  console.log( page )


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

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');

    const value = fieldQuery.value || '';
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: endpoint,
    });
  }

  return (
    <>
    <Head>
      <title>Rick And Morty Wiki</title>
    </Head>
    <Jumbotron className="hero" fluid={true}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: .8,
              opacity: 0,
            },
            visible: {
              scale: [1, 1.4, 1.2],
              opacity: 1,
              transition: {
                delay: .1,
                duration: .2,
              }
            }
          }}
        >
          <h1 className="title">
            Rick And Morty Wiki
          </h1>
        </motion.div>
        </Jumbotron>
    <Container fluid="sm">
      


      <main>
      
        <Row className="search">
          <Col>
        <Form className="justify-content-center" onSubmit={handleOnSubmitSearch} inline>
          <Form.Control name="query" type="search" />
          <button className="btn btn-primary">Search</button>
        </Form>
        </Col>
        </Row>
        
        <Row className="justify-content-center">
          { isEmpty(results) 
          ? <Col md={6} className="search" >                
              <h3>No Results</h3>
            </Col>
          : results.map(result => {
            const { id, name, image } = result;

            return (
              <Col md={6}>
              <motion.div 
                className="card" 
                key={id}
                whileHover={{
                  position: 'relative',
                  zIndex: 1,
                  background: 'white',
                  scale: [1, 1.6, 1.2],
                  rotate: [0, 10, -5, 0],
                  filter: [
                    'hue-rotate(0) contrast(100%)',
                    'hue-rotate(360deg) contrast(200%)',
                    'hue-rotate(45deg) contrast(300%)',
                    'hue-rotate(0) contrast(100%)',
                  ],
                  transition: {
                    duration: .2,
                  }
                }}
              >
                <Link 
                  href="/character/[id]" 
                  as={`/character/${id}`}
                  scroll={false}
                >
                  <a>
                    <img
                      src={image}
                      alt={`${name}-thumb`}
                    />
                    <h3>{name}</h3>
                  </a>
                </Link>
              </motion.div>
              </Col>
            )
          })}
          
        </Row>
        <Row className="search justify-content-center">
          <Col>
        { isEmpty(page.next) 
          ? 
              
              <p>All Results Loaded</p>
              
            
          : <Button className="justify-content-center" onClick={handleLoadMore}>Load More</Button>
        }
        </Col>
          </Row>
      </main>



    </Container>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(defaultEndPoint);
  const data = await res.json();

  return {
    props: {
      data,
    }
  }
}