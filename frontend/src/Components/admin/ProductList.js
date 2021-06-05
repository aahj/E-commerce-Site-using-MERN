import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, clearError, deleteProduct } from '../../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Sidebar from './Sidebar';

const ProductList = ({ history }) => {
    const Alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminProducts())

        if (error) {
            Alert.error(error);
            dispatch(clearError());
        }
        if (deleteError) {
            Alert.error(deleteError);
            dispatch(clearError());
        }
        if (isDeleted) {
            Alert.success("Product has been deleted");
            history.push('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

    }, [dispatch, Alert, error, deleteError, isDeleted, history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',                    
                }
            ],
            rows: []
        };

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className='btn btn-warning py-1 px-2'>
                        <i className='fa fa-pencil'></i>
                    </Link>
                    <button className='btn btn-danger py-1 px-2 ml-2' 
                    onClick={() => deleteProductHandler(product._id)}>
                        <i className='fa fa-trash'></i>
                    </button>
                </Fragment>
            })
        });
        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));        
    }

    return (
        <Fragment>
            <MetaData title={'All Products'} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className='my-5'>All Products</h1>
                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setProducts()}
                            className='py-3'
                            bordered
                            striped
                            hover
                            responsive
                        />
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default ProductList
