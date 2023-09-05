import React from 'react';
import { Form, Button, Input } from 'antd';
import styles from './style.module.css'

const CommonCategoryForm = ({ onFinish, isEditing, initialValues }) => {
    const initialFormValues = initialValues || {};

  return (
    <div className={styles.formContainer}>
    <Form
      name={isEditing ? 'editCategory' : 'addCategory'}
      onFinish={onFinish}
      layout="horizontal"
      initialValues={initialFormValues}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please input the slug',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
       wrapperCol={{
        offset: 8,
        span: 16,
      }}
      >
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
    </div>

  );
};

export default CommonCategoryForm;
