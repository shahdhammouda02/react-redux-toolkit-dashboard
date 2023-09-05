import React from 'react';
import { Form, Button, Input } from 'antd';
import styles from './style.module.css'

const CommonProductForm = ({ onFinish, isEditing, initialValues }) => {
  const initialFormValues = initialValues || {};

  return (
    <div className={styles.formContainer}>
    <Form
      name={isEditing ? 'editProduct' : 'addProduct'}
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
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input the title',
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
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input the description',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: 'Please input the quantity',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input the price',
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

export default CommonProductForm;
