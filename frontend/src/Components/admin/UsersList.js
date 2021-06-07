import React, { Fragment, useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import Loader from '../Layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, clearError, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstant';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';
import Sidebar from './Sidebar';

const UsersList = ({ history }) => {
    const Alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(allUsers())

        if (error) {
            Alert.error(error);
            dispatch(clearError());
        }

        if (isDeleted) {
            Alert.success("User has been deleted");
            history.push('/admin/users');
            dispatch({ type: DELETE_USER_RESET });
        }

    }, [dispatch, Alert, error, history, isDeleted])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        };

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className='btn btn-warning py-1 px-2'>
                        <i className='fa fa-pencil'></i>
                    </Link>
                    <button
                        onClick={() => deleteUserHandler(user._id)}
                        className='btn btn-danger py-1 px-2 ml-2'>
                        <i className='fa fa-trash'></i>
                    </button>
                </Fragment>
            })
        });
        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className='my-5'>All Users</h1>
                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setUsers()}
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

export default UsersList
