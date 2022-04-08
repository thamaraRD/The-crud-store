import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import styles from '../scss/ProductForm.module.scss'
import { Footer } from './Footer';

export const ProductForm = (props) => {
const { changesSubmit, initialValues, nameButton } = props;
const productSchema = Yup.object().shape({
    nameOfProduct: Yup.string()
    .required('Debe ingresar un nombre al producto'),
    brand: Yup.string()
    .required('Debe ingresar la marca del producto'),
    item: Yup.number()
    .required('Se requiere el item del producto')
    .min(3, 'El item debe tener  3 caracteres'),
    color: Yup.string(),
    madeIn: Yup.string()
    .required('Se requiere información de origen'),
    weight: Yup.number(),
    material: Yup.string(),
    productImageUrl: Yup.string()
    });

    return (
        <>
        <div className={styles.form2}>
    <Formik
    validationSchema={productSchema}
    onSubmit={changesSubmit}
    initialValues={initialValues}
    >
    {({ handleSubmit, handleChange, values, touched, errors }) => (
    <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nameOfProduct">         
        <Form.Label><span>*</span> Nombre del producto</Form.Label>
            <Form.Control
                type="text"
                name="nameOfProduct"
                placeholder="ej. Licuadora XP300"
                value={values.nameOfProduct}
                onChange={handleChange}
                isValid={touched.nameOfProduct && !errors.nameOfProduct}
                isInvalid={!!errors.nameOfProduct}
            />
            <Form.Control.Feedback type="invalid">
            {errors.nameOfProduct}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">            
            <Form.Label><span>*</span> Marca</Form.Label>
            <Form.Control
                type="text"
                name="brand"
                placeholder="ej. Oster"
                value={values.brand}
                onChange={handleChange}
                isValid={touched.brand && !errors.brand}
                isInvalid={!!errors.brand}
            />
            <Form.Control.Feedback type="invalid">
            {errors.brand}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="item">
            <Form.Label><span>*</span> Item</Form.Label>
            <Form.Control
                type="number"
                name="item"
                maxLength={3}
                placeholder="ej. 123"
                value={values.item}
                onChange={handleChange}
                isValid={touched.item && !errors.item}
                isInvalid={!!errors.item}
            />
            <Form.Control.Feedback type="invalid">
            {errors.item}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="color">            
            <Form.Label>Color</Form.Label>
            <Form.Control
                type="text"
                name="color"
                placeholder='ej. Rojo'
                value={values.color}
                onChange={handleChange}
                isValid={touched.color && !errors.color}
                isInvalid={!!errors.color}
            />   
            <Form.Control.Feedback type="invalid">
            {errors.color}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="madeIn">            
            <Form.Label><span>*</span> País de fabricación</Form.Label>
            <Form.Control
                type="text"
                name="madeIn"
                placeholder='ej. China'
                value={values.madeIn}
                onChange={handleChange}
                isValid={touched.madeIn && !errors.madeIn}
                isInvalid={!!errors.madeIn}
            />   
            <Form.Control.Feedback type="invalid">
            {errors.madeIn}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="weight">            
            <Form.Label>Peso (Kg)</Form.Label>
            <Form.Control
                type="number"
                name="weight"
                placeholder='ej. 1KG'
                value={values.weight}
                onChange={handleChange}
                isValid={touched.weight && !errors.weight}
                isInvalid={!!errors.weight}
            />   
            <Form.Control.Feedback type="invalid">
            {errors.weight}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="material">            
            <Form.Label>Material</Form.Label>
            <Form.Control
                type="text"
                name="material"
                placeholder='ej. Plástico'
                value={values.material}
                onChange={handleChange}
                isValid={touched.material && !errors.material}
                isInvalid={!!errors.material}
            />   
            <Form.Control.Feedback type="invalid">
            {errors.material}
            </Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="productImageUrl">            
            <Form.Label>Imagen Referencial (URL) </Form.Label>
            <Form.Control
                type="text"
                name="productImageUrl"
                value={values.productImageUrl}
                onChange={handleChange}
                isValid={touched.productImageUrl && !errors.productImageUrl}
                isInvalid={!!errors.productImageUrl}
            />
            <Form.Control.Feedback type="invalid">
            {errors.productImageUrl}
            </Form.Control.Feedback>
            </Form.Group>      
    <Button variant="primary" type="submit" className="my-2">{nameButton}</Button>
        </Form>
    )}
    </Formik>
    <Footer />
    </div>
    </>
)
};
