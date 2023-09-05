import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById, updateCategory, fetchCategories, createCategory } 
    from '../../../store/slices/CategoriesSlice';
import { Form , notification} from 'antd';
import CommonCategoryForm from './CommonCategoryForm ';

const CrudCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.categoryById);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        slug: category.slug,
      });
    }
  }, [category, form]);

  const onFinish = async (values) => {
    const updatedData = {
      name: values.name,
      slug: values.slug,
    };
    try {
      if (id) {
        await dispatch(updateCategory({ id, updatedData }));
        notification.success({
          message: 'Category Updated',
          description: 'The category has been successfully updated.',
        });
      } else {
        await dispatch(createCategory({ name: values.name, slug: values.slug }));
        notification.success({
          message: 'Category Added',
          description: 'The category has been successfully added.',
        });
      }

      dispatch(fetchCategories());
      navigate('/allcategories');
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while updating/adding the category.',
      });
    }
  
    // if (id) {
    //   dispatch(updateCategory({ id, updatedData })).then(() => {
    //     dispatch(fetchCategories());
    //     navigate('/allcategories');
    //   });
    // } else {
    //   dispatch(createCategory({ name: values.name, slug: values.slug })).then(() => {
    //     dispatch(fetchCategories());
    //     navigate('/allcategories');
    //   });
    // }
  };

  if (id && !category) {
    return <div>Loading...</div>;
  }

  const initialValues = id ? { name: category.name, slug: category.slug } : {};

  return (
    <div>
      <h1 style={{textAlign:"center"}}>{id ? 'Edit Category' : 'Add Category'}</h1>
      {id && category && (
        <CommonCategoryForm onFinish={onFinish} isEditing={!!id} initialValues={initialValues} />
      )}
      {!id && (
        <CommonCategoryForm onFinish={onFinish} isEditing={!!id} />
      )}
      </div>
  );
};

export default CrudCategory;
