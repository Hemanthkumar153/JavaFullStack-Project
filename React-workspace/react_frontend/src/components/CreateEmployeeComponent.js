import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function CreateEmployeeComponent() {

    let navigate=useNavigate();

    const[employee,setEmployee] = useState({
        first_Name : " ",
        last_Name : " ",
        email  : " "
    })

    const handleClick=(e)=>{
        var name = e.target.name;
        var value = e.target.value;
        setEmployee({...employee,[name]:value});
    }

    const saveHandler=(e)=>{
        e.preventDefault();
        EmployeeService.createEmployee(employee).then(res=>{
            navigate('/employees')
        })
    }

    const cancelHandler=()=>{
        navigate('/employees')
    }


  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3'>
            <h3 className='text-center'>Add Employee</h3>
            <div className='card-body'>
                <form>
                    <div className='form-group my-2'>
                        <label>First Name : </label>
                        <input type='text' placeholder='First Name' name='first_Name' className='form-control' autoComplete='off'
                         value={employee.first_Name} 
                        onChange={handleClick}/>
                    </div>

                    <div className='form-group my-2'>
                        <label>Last Name : </label>
                        <input type='text' placeholder='Last Name' name='last_Name' className='form-control' autoComplete='off' 
                        value={employee.last_Name} 
                        onChange={handleClick}/>
                    </div>

                    <div className='form-group my-2'>
                        <label>Email : </label>
                        <input type='text' placeholder='Email' name='email' className='form-control' autoComplete='off' 
                        value={employee.email}
                         onChange={handleClick}/>
                    </div>

                    <button className='btn btn-success mt-3 ms-2' onClick={saveHandler}>Save</button>
                    <button className='btn btn-danger mt-3 ms-2' onClick={cancelHandler}>Cancel</button>
                </form>
            </div>
         </div>
      </div> 
    </div>
  )
}

export default CreateEmployeeComponent
