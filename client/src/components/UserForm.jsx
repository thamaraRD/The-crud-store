import React from 'react';
import styles from '../scss/UserForm.module.scss'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form ,Button } from 'react-bootstrap';

export const UserForm = (props) =>{
    const { login, formHandler, nameButton } = props;
//Parámetros de Form de registro de usuario
    const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'El nombre no puede tener menos de 3 caracteres')
        .required('Debe ingresar un nombre'),
        lastName: Yup.string()
        .min(3, 'El nombre no puede tener menos de 3 caracteres')
        .required('Debe ingresar un apellido'),
        email: Yup.string()
        .email('El formato de email debe ser válido')
        .required('Debe ingresar un email'),
        password: Yup.string()
        .min(6, 'La contraseña debe tener más de 6 caracteres')
        .required('Ingrese una contraseña'),
        confirmPassword: Yup.string()
        .required('Ingrese contraseña')
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    });
//Parámetros de Form de login de usuario
    const loginSchema = Yup.object().shape({
        email: Yup.string()
        .email('El formato de email debe ser válido')
        .required('Debe ingresar un email'),
        password: Yup.string()
        .min(6, 'La contraseña debe tener más de 6 caracteres')
        .required('Ingrese una contraseña'),
    });
    return(
        <>
        <div className={styles.form1}>
    <Formik
    initialValues={{
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
    }}
    validationSchema={login ? loginSchema : SignupSchema}
    onSubmit={formHandler}
    >
    {({ errors,
        touched,
        values,
        handleChange,
        handleSubmit,
        getFieldProps,
        isValid,
        dirty, }) => (
        <Form noValidate onSubmit={handleSubmit}>
            {!login && (
            <>
        <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>
                <span>*</span> Nombre
                </Form.Label>
                <Form.Control
                type="text"
                name="firstName"
                placeholder="John"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                {errors.firstName}
                </Form.Control.Feedback>
            </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>
                <span>*</span> Apellido
                </Form.Label>
                <Form.Control
                type="text"
                name="lastName"
                placeholder="Doe"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                {errors.lastName}
                </Form.Control.Feedback>
            </Form.Group>
        </>
                )}
    <Form.Group className="mb-3" controlId="email">
            <Form.Label>
                <span>*</span> Correo electrónico
            </Form.Label>
            <Form.Control
                type="email"
                name="email"
                placeholder="email@dominio.com"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
                {errors.email}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
            <Form.Label>
                <span>*</span> Contraseña
            </Form.Label>
            <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
                {errors.password}
            </Form.Control.Feedback>
            </Form.Group>
            {!login && (
                <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>
                <span>*</span> Confirmar contraseña
                </Form.Label>
                <Form.Control
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isValid={
                    touched.confirmPassword && !errors.confirmPassword
                }
                isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
                </Form.Control.Feedback>
            </Form.Group>
                )}
<Button variant="primary" className="my-3 text-dark" type="submit" disabled={!(dirty && isValid)}>{nameButton}</Button>
        </Form>
    )}
    </Formik>
        </div>
        </>
    )
};
