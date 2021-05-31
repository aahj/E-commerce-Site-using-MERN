import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Products from './products/Products';
import Loader from './Layouts/Loader';
import { useAlert } from 'react-alert';
import Pagination from "react-js-pagination";
import { Slider } from '@material-ui/core';

const Home = ({ match }) => {
    let alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1200]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const cattegories = [
        'Electronics',
        'Home',
        'Laptop',
        'Cameras',
        'Accessories',
        "Headphones",
        'Foods',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor'
    ];

    // pull prod from states
    const {
        loading,
        error,
        products,
        productsCount,
        resPerPage,
        filteredProductCount
    } = useSelector(state => state.products)

    const keyword = match.params.keyword;

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));

    }, [dispatch, alert, error, currentPage, keyword, price, category, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    // if there is keyword on search and after filter (handle pagination on search page)
    if (keyword) {
        count = filteredProductCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Online Best Products'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {keyword ?
                                <Fragment>
                                    <div className='col-md-3 col-6 mt-5 b-5'>
                                        <div className='px-5'>
                                            <Slider
                                                valueLabelDisplay="auto"
                                                aria-labelledby="range-slider"
                                                min={1}
                                                max={1200}
                                                defaultValue={[1, 1200]}
                                                // getAriaValueText={{'hi':'d'}}
                                                value={price}
                                                marks={[
                                                    {
                                                        value: 1, label: '$1'
                                                    },
                                                    {
                                                        value: 1200, label: '$1200'
                                                    }
                                                ]}
                                                onChange={(e, price) => setPrice(price)}
                                            />

                                            <hr className='my-5' />
                                            <div className='mt-5'>
                                                <h4 className='mb-3'>Categories</h4>
                                                <ul className='pl-0'>
                                                    {
                                                        cattegories.map(category => (
                                                            <li key={category}
                                                                className='category_filter'
                                                                style={{ listStyle: 'none', cursor: 'pointer' }}
                                                                onClick={() => setCategory(category)}
                                                            >
                                                                {category}
                                                            </li>
                                                        ))
                                                    }
                                                </ul>

                                            </div>
                                            <hr className='my-3' />
                                            <div className='mt-5'>
                                                <h4 className='mb-3'>Ratings</h4>
                                                <ul className='pl-0'>
                                                    {
                                                        [5, 4, 3, 2, 1].map(stars => (
                                                            <li key={stars}
                                                                style={{ listStyle: 'none', cursor: 'pointer' }}
                                                                onClick={() => setRating(stars)}
                                                            >
                                                                <div className="rating-outer">
                                                                    <div className="rating-inner"
                                                                        style={{
                                                                            width: `${stars * 20}%`
                                                                        }}
                                                                    >
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-md-9 col-6 mt-5 b-5'>
                                        <div className='row'>
                                            {
                                                products && products.map(items => (
                                                    <Products key={items._id} product={items} col={4} />
                                                ))
                                            }
                                        </div>

                                    </div>
                                </Fragment>
                                : (
                                    products && products.map(items => (
                                        <Products key={items._id} product={items} col={3} />
                                    ))
                                )}
                        </div>
                    </section>

                    {/* if only 4 resperpage and  2 products count in DB then it will not show pagination*/}
                    {resPerPage <= count && (
                        <div className='d-flex justify-content-center mt-5'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText='Next'
                                prevPageText='Prev'
                                firstPageText='First'
                                lastPageText='Last'
                                itemClass='page-item'
                                linkClass='page-link'
                            />                            
                        </div>
                    )}
                </Fragment>
            }
        </Fragment>
    )
}

export default Home
