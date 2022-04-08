import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from '../scss/NavBar.module.scss';

const KEY = 'The-store-crud';

export const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [ ,setProduct] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogOut = () => {
    setUser(null);
    sessionStorage.removeItem(KEY);
    navigate("/login");
  };

  
  useEffect(() => {
    location.pathname === '/' ? setProduct(true) : setProduct(false);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
console.log(user);
  return (
    <>
      { user ? (
        <div className={styles.navBar}>
        <Navbar bg="dark" expand="lg" className="mb-4">
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaIvWEUklWyfD8RnvofbVAwLEeee58744xNg&usqp=CAU"
                    alt="logo store"
                    width="100"
                    height="50"
                />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <LinkContainer to="/">
                    <Nav.Link className='text-white'>Home <FontAwesomeIcon icon={faHouse}  /></Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
                <Row>
                    <Col>
                    <p className="color-name-user text-end">
                    Usuario: <b><u>{user.firstName}</u></b> <i class="fa-solid fa-user-check"></i>
                    </p>
                    <Button className='mb-2' variant="light" onClick={handleLogOut}>Cerrar sesión <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
                    </Button>
                </Col>
                </Row>
            </Container>
            </Navbar>
        </div>
  ) : (
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
        <img
          alt="logo store"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaIvWEUklWyfD8RnvofbVAwLEeee58744xNg&usqp=CAU"
          width="100"
          height="50"
          /> <h4 className='d-block m-auto mt-2'>SISTEMA DE ACCESO</h4>     
      </Navbar.Brand>
    </Container>
  </Navbar>
            </>
      )}
        </>
  )
};
