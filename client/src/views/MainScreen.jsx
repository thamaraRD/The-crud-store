import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../helpers/axios';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';
import { Button , Col, Container, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Footer } from '../components/Footer';
import noImage from '../assets/no-image.png';
import Modal  from '../components/ModalComponent';
import styles from '../scss/MainScreen.module.scss';

const KEY = 'The-store-crud';

export const MainScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState({});

//Obtener el producto por el ID by User
const getProductByUser = async () =>{
  try{
    const productByUser = await axiosWithToken(`product/user/${user._id}`);
    setProducts(productByUser.data)
    setLoaded(true);
  }catch(err){
  console.log('error al traerse el producto by user', err);
  }
};
//Borrar producto
const deleteProductById = async (id) => {
  try{
    axiosWithToken(`product/delete/${id}`, {}, "DELETE");
    navigate('/');
    Swal.fire({
                title: 'Producto borrado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
                timer: 2400
            }).then((result) => {
              if(result.isConfirmed){
                setProducts(products.filter((product) => product._id !== id));
              }
          })
        }catch(err){
          if (err.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Su sesión ha expirado. Debe volver a iniciar sesión.",
              showConfirmButton: false,
              timer: 2000,
            });
            setTimeout(() => {
              handleLogOut();
            }, 2100);
          }
        };
};
useEffect(() => {
  if(!user){
    navigate('/login')
  }
}, [user, navigate]);

useEffect(() => {
  getProductByUser();
}, []) // eslint-disable-line react-hooks/exhaustive-deps

const handleLogOut = () => {
  setUser(null);
  sessionStorage.removeItem(KEY);
  navigate("/login");
};

const handleModal = (_item) =>{
setItem(_item);
setShowModal(true);
}

  return (
    <>
    <Container className="my-5 bg-light shadow">
      <Row>
        <Col className='mt-3'>
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Nombre del producto</th>
      <th>Marca</th>
      <th>Item</th>
      <th className='text-center'>País de Fabricación</th>
      <th className='text-center'>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {loaded && products.length === 0 ? (
      <tr>
      <td colSpan="12" className='text-center'>NO HAY PRODUCTOS INGRESADOS PARA STOCK</td>
      </tr>
    ) : (
        products.map((product) => (
    <tr key={product._id}>
      <td>{product.nameOfProduct}</td>
      <td>{product.brand}</td>
      <td>{product.item}</td>
      <td>{product.madeIn}</td>

      <td className='text-center'><Button variant="primary">
                    <Link to={`product/${product._id}`} className="text-decoration-none text-light"><FontAwesomeIcon icon={faPen} size="1x" /> </Link>
                </Button> | <Button variant="danger" onClick={()=> deleteProductById(product._id)}><FontAwesomeIcon icon={faTrashCan} /></Button> | <Button variant='success' onClick={() => handleModal(product)}><FontAwesomeIcon icon={faEye} />
                </Button>
                </td>
    </tr>
        ))
    )}
  </tbody>
</Table>


<Modal show= {showModal} handleClose={()=> setShowModal(false)}>
 <ul className={styles.ul}>
   <li>
   Imagen Referencial: <img src={item.productImageUrl ? item.productImageUrl : noImage } alt={`imagen del produto ${item.nameOfProduct}`} height={80} />
   </li>
   <li>
   Nombre: {item.nameOfProduct}
   </li>
   <li>
    Marca: {item.brand}
   </li>
   <li>
     N° Item: {item.item} 
   </li>
   <li>
     Color: {item.color}
   </li>
   <li>
     País de fabricación: {item.madeIn}
   </li>
   <li>
     Peso (Kg): {item.weight}
   </li>
   <li>
     Material: {item.material}
   </li>
 </ul>
</Modal>

<Button variant="secondary" className="float-end mb-2">
        <Link to={'product/create'} className="text-decoration-none text-light">
            <FontAwesomeIcon icon={faPlus} size="1x"/> Agregar producto
        </Link>
        </Button>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  )
}
