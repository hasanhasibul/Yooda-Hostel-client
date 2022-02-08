
import React, { useEffect, useState } from 'react';
import DefaultLayout from './DefaultLayout';
import axios from 'axios';
import Loading from './Loading';
const Distribution = () => {
    
    const [food, setFood] = useState([])
    const [searchRoll, setSearchRoll] = useState({})
    const [searchResult, setSearchResult] = useState([])
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(false)

    const [studentRoll, setStudentRoll] = useState({})

    const handleRoll=(e)=>{
        const newstudentRoll = {...studentRoll}
        newstudentRoll[e.target.name] = e.target.value 
        setStudentRoll(newstudentRoll)
    }

    useEffect(() => {
        const getFood = async () => {
            try {
                const response = await axios.get('https://pacific-falls-14621.herokuapp.com/api/food/getFood')
                setFood(response.data)
                setLoading(true)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFood()
    }, [])

    //    search handleling 
    const blurSearch = (e) => {
        const newSearch = { ...searchRoll }
        newSearch[e.target.name] = e.target.value
        setSearchRoll(newSearch)
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post('https://pacific-falls-14621.herokuapp.com/api/student/searchByRoll', searchRoll)
            console.log(response.data);
           if(response.data[0]){
            setSearchResult(response.data[0])
            setLoading(true)

           }
           else{
            alert('Student not found')
           }
        } catch (error) {
            console.log(error);
        }

    }

    //   end

    const [select, setSelect] = useState({})
    const handleSelect = (e) => {
        const newSelect = { ...select }
        newSelect[e.target.name] = e.target.value
        setSelect(newSelect)
    }
  
    const handleSubmite = async (event) => {
        event.preventDefault();
        const studentObj = {...select ,...studentRoll  }

        try {
            await axios.post('https://pacific-falls-14621.herokuapp.com/api/distribution/addDistribuiton', studentObj)
            setSuccess("distribution added succesfully")
            console.log("distribution added succesfully");
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }
    return (
        <DefaultLayout>
            <div className="p-4">


                <div className="row ">
                    <div className="col-md-3  ">
                        <label for="exampleInputPassword1">Search By student Roll </label>
                        <input onBlur={blurSearch} name="roll" type="text" class="form-control" id="exampleInputPassword1" placeholder="Search By Roll" />
                        <br /><button onClick={handleSearchSubmit} type="submit" class="btn btn-primary">Search</button>
                    </div>
                    <div className="col-md-1 mt-4">
                        <br />
                    </div>
                </div>
                <br />
                <br />

            {
                loading ?  <form className='p-4' >
                <div class="form-group">
                    <label for="exampleInputPassword1">Student ID </label>
                    <input name="roll" onBlur={handleRoll} value={searchResult.roll} type="number" class="form-control" id="exampleInputPassword1" placeholder="Student ID" />
                </div>

                <div class="form-group">
                    <label for="exampleFormControlSelect1"> Shifting </label>
                    <select onChange={handleSelect} name="shiftment" class="form-control" id="exampleFormControlSelect1">
                        <option selected >select</option>
                        <option value='shift'>shift</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Date </label>
                    <input onChange={handleSelect} className='form-control' type="date" name="date" id="" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Food Item</label>
                    <select onChange={handleSelect} name="foodName" class="form-control" id="exampleFormControlSelect1">
                        {
                            food.map(pd => <option value={pd.foodName} > {pd.foodName} </option>)
                        }
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1"> status </label>
                    <select onChange={handleSelect} name="Status" class="form-control" id="exampleFormControlSelect1">
                        <option selected >status</option>
                        <option value='served'>served</option>
                        <option value='not served'>not served</option>
                    </select>
                </div>
                <button onClick={handleSubmite} type="submit" class="btn btn-primary">Submit</button>
            </form>
                
                : <Loading></Loading>
            }
                
                {
                    success ? <h3 className="text-primary">{success}</h3> : <h3 className="text-danger">{error}</h3>
                }
            </div>
        </DefaultLayout>
    );
};

export default Distribution;