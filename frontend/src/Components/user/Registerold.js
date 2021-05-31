import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { register_user, clearError } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const Register = ({ history }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/image/preview.png');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
        if (error) {
            alert.error(error)
            dispatch(clearError());
        }

    }, [dispatch, alert, error, isAuthenticated,history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)

        dispatch(register_user(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            // when we readAsDataURL() we have to call back this onload()
            reader.onload = () => {
                // 3 types => 0 means reader has created, 1 means that it is inprocessing, 
                // 2 means that everything is ready
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }
    return (
        <Fragment>
            <MetaData title={'Register User'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input type="name"
                                id="name_field"
                                className="form-control"
                                value={name}
                                onChange={onChange}
                                name='name'
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={onChange}
                                name='email'
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={onChange}
                                name='password'
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
