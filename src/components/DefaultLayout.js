import React from 'react';
import { Link } from 'react-router-dom';

const DefaultLayout = (props) => {
    return (
        <div className='container bg-color' >
            <div className="row">
                <div className="col-md-2 left-side-ber ">
                        <li className="menu-item "> <Link to='/add-item' ><h4>Add Food Item</h4></Link> </li>
                        <li className="menu-item "> <Link to='/food-price' ><h4> Food And Price</h4></Link> </li>
                        <li className="menu-item"><Link to='/add-student' >Add Student</Link></li>
                        <li className="menu-item"><Link to='/student-table' >View Student</Link></li>
                        <li className="menu-item"><Link to='/distribution' >Distribution</Link></li>
                 </div>
                <div className="col-md-10">
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;