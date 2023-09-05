import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, notification} from 'antd';
import { fetchProductById, updateProduct, createProduct, fetchProducts } from '../../../store/slices/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';
import CommonProductForm from './CommonProductForm'; 

const CrudProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.productById);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        title: product.title,
        slug: product.slug,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
      });
    }
  }, [product, form]);

  const onFinish = async (values) => {
    const updatedData = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      quantity: values.quantity,
      price: values.price,
    };
    try{
    if (id) {
      await dispatch(updateProduct({ id, updatedData })).then(() => {
        notification.success({
          message: 'Product Updated',
          description: 'The product has been successfully updated.',
        });
      });
    } else {
      await dispatch(createProduct(updatedData)).then(() => {
        notification.success({
          message: 'Product Added',
          description: 'The product has been successfully added.',
        });
      });
    }
    dispatch(fetchProducts());
      navigate('/allproducts');
  } catch (error) {
    notification.error({
      message: 'Error',
      description: 'An error occurred while updating/adding the product.',
    });
  };
  }

  if (id && !product) {
    return <div>Loading...</div>;
  }

  const initialValues = id
    ? {
        title: product.title,
        slug: product.slug,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
      }
    : {};

  return (
    <div>
      <h1 style={{textAlign:"center"}}>{id ? 'Edit Product' : 'Add Product'}</h1>
      <CommonProductForm onFinish={onFinish} isEditing={!!id} initialValues={initialValues} />
    </div>
  );
};

export default CrudProducts;