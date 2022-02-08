import axios from 'axios';
import React, { useState } from 'react';
import DefaultLayout from './DefaultLayout';
import Loading from './Loading';
const AddFoodItem = () => {
    const [food, setFood] = useState({})
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(true)
    const handleBlure = (e) => {
        console.log(e.target.value);
        const newFood = { ...food };
        newFood[e.target.name] = e.target.value;
        setFood(newFood)
    }
    const handleSubmite = async (event) => {
        event.preventDefault();
       setLoading(false)

           try {
            await axios.post('http://localhost:5000/api/food/addFood' , food)
            setSuccess("food added succesfully")
            setLoading(true)
            console.log("food added succesfully");
           } catch (error) {
               console.log(error);
               setLoading(true)
               setError(error.message)
           }

    }
    return (
        <div>
            <DefaultLayout>
                <div className="p-4">
                    {
                        loading ? <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Food Name </label>
                            <input onBlur={handleBlure} type="text" name="foodName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Food Name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Food Price </label>
                            <input onBlur={handleBlure} name="foodPrice" type="number" class="form-control" id="exampleInputPassword1" placeholder="Food Price" />
                        </div>

                        <button onClick={handleSubmite} type="submit" class="btn btn-primary">Submit</button>
                    </form> : <Loading></Loading>
                    }
                    
                    {
                        success ? <h3 className="text-primary">{success}</h3>:  <h3 className="text-danger">{error}</h3>
                    }
                </div>
            </DefaultLayout>
        </div>
    );
};

export default AddFoodItem;