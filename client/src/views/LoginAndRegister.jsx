import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { UserContext } from '../context/UserContext';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { axiosWithoutToken } from '../helpers/axios';

const KEY = 'The-store-crud';

const LoginAndRegister = ({login, goto}) =>{
const { user ,setUser } = useContext(UserContext);
const navigate = useNavigate();
const location = useLocation();
const setLogin = () => null;

//Registrar el usuario
    const registerUser = async (values, {resetForm}) =>{
        try{
            const response = await axiosWithoutToken("auth/register", values, "POST");
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: `<b>${values.firstName}</b> se registró con éxito, favor inicie sesión`,
                confirmButtonText: '¡Ok!'
            }).then((result) => {
                if(result.isConfirmed){
                    navigate('/login');
                }
            });
            resetForm();
            }catch(err){
            console.log(err.response);
            Swal.fire({
                title: '¡Algo ha sucedido!',
                text: err.response.data.error.message,
                icon: 'error',
                confirmButtonText: 'Ok',
            })
        };
    };

    //Login de usuario
    const loginUser = async (values) =>{
        try{
            const login = await axiosWithoutToken("auth/login", values, "POST");
            console.log('Data de axios:', login.data);
            sessionStorage.setItem(KEY, JSON.stringify({...login.data}));
            console.log(sessionStorage);
            setUser(login.data);
            Swal.fire({
                title: '¡Se inicio sesión exitosamente!',
                icon: 'success',
                showConfirmButton: false,
                timer:2100
            });
            setTimeout(() => {
            navigate('/');
            }, 2500);
        }catch(err){
            Swal.fire({
                title: 'Usuario o Contraseña inválida, por favor revisa e intenta de nuevo',
                icon: 'error',
                confirmButtonText: 'Ok',
        })
    }
}
useEffect(() => {
    if(user){
        navigate('/');
    }
location.pathname === '/register' ? setLogin(false) : setLogin(true);

}, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <Container className='m-5 w-75 mx-auto'>
            <Row className="d-flex justify-content-center align-items-center">
                <Col className='col-5 bg-light shadow rounded'>
            {login ? 
            <h2 className='mt-4 text-center'>LOGIN</h2>
            : 
            <h2 className='mt-4 text-center'>REGISTRO</h2>}
            <UserForm
            login={login}
            formHandler={login ? loginUser : registerUser }
            nameButton={login ? 'Acceder' : 'Registrarme'}
            />
            <Button variant="warning" className="my-3 me-2 d-block ms-auto" onClick={() => navigate(goto)}>{!login ? 'Accede aquí' : 'Registrate aquí'}</Button>
            </Col>
            </Row>
        </Container>
    )
            }
export default LoginAndRegister;