
import React, { useState } from 'react';
import DefaultLayout from './DefaultLayout';
import axios from 'axios';
import Loading from './Loading';
const AddStudent = () => {
    const [student, setStudent] = useState({})
    const [loading,setLoading] = useState(true)
    const [select, setSelect] = useState({
        status: ''
    })
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const handleBlure = (e) => {
        const newStudent = { ...student }
        newStudent[e.target.name] = e.target.value;
        setStudent(newStudent)
    }

    const handleSelect = (e) => {

        const newStatus = { ...select }
        newStatus.status = e.target.value
        setSelect(newStatus)
    }
    const handleSubmite = async (event) => {
        event.preventDefault();
        const studentObj = { ...student, ...select }
        setLoading(false)
        try {
            await axios.post('http://localhost:5000/api/student/addStudent', studentObj)
            setLoading(true)
            setSuccess("student added succesfully")
            console.log("student added succesfully");
        } catch (error) {
            console.log(error);
            setError(error.message)
            setLoading(true)
        }
    }
    return (
        <DefaultLayout>
            <div className="p-4">

                {
                    loading ? <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Full Name </label>
                        <input onBlur={handleBlure} name="fullName" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Student Roll </label>
                        <input onBlur={handleBlure} name="roll" type="number" class="form-control" id="exampleInputPassword1" placeholder="Student Roll" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Age </label>
                        <input onBlur={handleBlure} name="age" type="number" class="form-control" id="exampleInputPassword1" placeholder="Age" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Class </label>
                        <input onBlur={handleBlure} name="class" type="text" class="form-control" id="exampleInputPassword1" placeholder="class" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Hall Name  </label>
                        <input onBlur={handleBlure} name="hallName" type="text" class="form-control" id="exampleInputPassword1" placeholder="Hall Name " />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1"> status </label>
                        <select onChange={handleSelect} name="fullName" class="form-control" id="exampleFormControlSelect1">
                            <option selected >status</option>
                            <option value='active'>active</option>
                            <option value='inActive'>inactive</option>
                        </select>
                    </div>
                    <button onClick={handleSubmite} type="submit" class="btn btn-primary">Submit</button>
                </form> : <Loading></Loading>
                }
                
                {
                    success ? <h3 className="text-primary">{success}</h3> : <h3 className="text-danger">{error}</h3>
                }
            </div>
        </DefaultLayout>
    );
};

export default AddStudent;