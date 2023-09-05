import React, { useEffect, useRef, useState } from 'react';
import { Typography, Table, Button, Space, Input, Pagination, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../store/slices/ProductsSlice';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      ...getColumnSearchProps('slug'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.slug.localeCompare(b.slug),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (row) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(row._id)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(row._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = async (productId) => {
    try{
    await dispatch(deleteProduct(productId));
    notification.success({
      message: 'Product Deleted',
      description: 'The product has been successfully deleted.'
    })
    dispatch(fetchProducts());
  } catch (error) {
    notification.error({
      message: 'Error',
      description: 'An error occurred while deleting the category.',
    });
  }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const filteredProducts = products
    ? products.filter((product) =>
        searchedColumn ? getColumnSearchProps(searchedColumn).onFilter(searchText, product) : true
      )
    : [];

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleAdd=()=>{
    navigate('/add-product')
  }

  return (
    <div>
      <Typography.Title level={4}>All Products</Typography.Title>
      <Button type="primary" style={{ marginBottom: '16px' }} onClick={handleAdd}>
        Add Product
      </Button>
      <Table
        dataSource={paginatedProducts}
        columns={columns}
        loading={
          loading['products/deleteProduct'] || 
          loading['products/fetchProducts'] ||
          loading['products/updateProduct'] ||
          loading['products/createProduct']
        }
        pagination={false}
      />
      <br />
      <Pagination
        current={currentPage}
        total={filteredProducts.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllProducts;