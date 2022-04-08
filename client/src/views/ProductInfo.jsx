import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { UserContext } from '../context/UserContext';
import { axiosWithToken } from '../helpers/axios';
import Swal from 'sweetalert2';
import { Col, Container, Row } from 'react-bootstrap';

const KEY = 'The-store-crud';

export const ProductInfo = () => {
const startingData = {
  nameOfProduct: '',
  brand: '',
  item: '',
  color: '',
  madeIn: '',
  weight: '',
  material: '',
  productImageUrl: ''
}
const navigate = useNavigate();
const [loaded, setLoaded] = useState(false);
const { user, setUser } = useContext(UserContext);
const { id } = useParams();
const [ initialData, setInitialData ] = useState(startingData);

//Crear Info del producto
const createProductInfo = async (values, {resetForm}) => {
  try{
  await axiosWithToken(
      "product/create", {...values, userId: user._id}, "POST");
      Swal.fire({
        title: '¡Éxito!',
        text: 'Su producto se creó con éxito',
        icon: 'success',
        ShowConfirmButton: false,
        timer: 2300
    });
    resetForm();
    setTimeout(() => {
        navigate('/')
    }, 2400);
}catch(err){
  console.log("error del catch",err)
  Swal.fire({
    icon: "error",
    title: "Error",
    text: err.response.data.message,
    confirmButtonText: "Aceptar",
  });
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
  };
    };
};

//Obtener un producto by ID
const getOneProductById = async () => {
  try{
    const product = await axiosWithToken(`product/${id}`);
    setInitialData(product.data);
    setLoaded(true);
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

//Actualizar producto
const updateProductById = async (values) => {
  try{
    const response = await axiosWithToken(`product/update/${id}`, values, "PUT");
    console.log('producto actualizado??', response);
    Swal.fire({
      icon: "success",
      title: "El producto fue modificado",
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      navigate("/");
    }, 2100);
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
    };
  };
};

useEffect(() => {
  const fetchData = async () =>{
      console.log('useEffect:',id);
      if (id) {
          await getOneProductById();
      }else{
          setLoaded(true);
      }
  };
  fetchData();
}, [id]) // eslint-disable-line react-hooks/exhaustive-deps


const handleLogOut = () => {
  setUser(null);
    sessionStorage.removeItem(KEY);
    navigate("/login");
};

  return (
    <>
    <Container className='m-4 mx-auto'>
            <Row className="d-flex justify-content-center align-items-center">
                <Col className='col-5 ps-4 pe-4 pb-3 pt-3 bg-light shadow rounded'>
        {loaded ? (
                <ProductForm
                changesSubmit={id !== undefined ? updateProductById : createProductInfo}
                initialValues={initialData}
                nameButton={id !== undefined ? 'Actualizar' : 'Crear'}
                />
            ) : (
              <h2>Espere por favor...</h2>
              )}      
        </Col>
      </Row>
    </Container>
    </>
  )
};
