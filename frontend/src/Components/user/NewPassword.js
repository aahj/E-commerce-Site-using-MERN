import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassowrd, clearError } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const NewPassword = ({ history, match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success } = useSelector(state => state.forogotPassword);

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearError());
        }
        if (success) {
            history.push('/login')
            alert.success('Password Has Been Updated Successfully')
        }

    }, [dispatch, success, alert, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password)
        formData.set('confirmPassword', confirmPassword)
        // here token if for reset
        dispatch(resetPassowrd(match.params.token, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Reset Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default NewPassword
