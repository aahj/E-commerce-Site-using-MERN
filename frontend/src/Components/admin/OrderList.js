import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { allOrders, deleteOrder, clearError } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Sidebar from './Sidebar';

const OrderList = ({ history }) => {
    const Alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(allOrders())

        if (error) {
            Alert.error(error);
            dispatch(clearError());
        }

        if (isDeleted) {
            Alert.success("Order has been deleted");
            history.push('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET });
        }

    }, [dispatch, Alert, error, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No Of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        };

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes("Delivered")
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className='btn btn-warning py-1 px-2'>
                        <i className='fa fa-eye'></i>
                    </Link>
                    <button
                        className='btn btn-danger py-1 px-2 ml-2'
                        onClick={() => deleteOrderHandler(order._id)}>
                        <i className='fa fa-trash'></i>
                    </button>
                </Fragment>
            })
        });
        return data;
    }
    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className='my-5'>All Orders</h1>
                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setOrders()}
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

export default OrderList
