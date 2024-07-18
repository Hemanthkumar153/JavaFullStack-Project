import React from 'react'
import { useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

function UpdateEmployeeComponent() {

    let navigate = useNavigate();

    const [first_Name,setFirstName]=useState("");
    const [last_Name,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const {id} = useParams();

    useEffect(()=>{
        EmployeeService.getEmployeeById(id).then((res)=>{
            setFirstName(res.data.first_Name);
            setLastName(res.data.last_Name);
            setEmail(res.data.email);
        }).catch(error=>
        {
            console.log(error)
        }
        )
    },[])

    const updateHandler=(e)=>{
        e.preventDefault();
        const employee={first_Name,last_Name,email};
        if(id){
            EmployeeService.updateEmployee(id,employee).then(res=>{
                navigate('/employees');
            });
        }
        else{
            EmployeeService.createEmployee(employee).then(res=>{
                console.log(res.data);
                navigate('/employees');
            })
        }
    }

    const cancelHandler=(e)=>{
        navigate('/employees');
    }

  return (
    
      <div className='container mt-5'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3'>
            <h3 className='text-center'>Update Employee</h3>
            <div className='card-body'>
                <form>
                    <div className='form-group my-2'>
                        <label>First Name : </label>
                        <input type='text' placeholder='First Name' name='first_Name' className='form-control' 
                        value={first_Name} onChange={(e)=>setFirstName(e.target.value)}/>
                        
                    </div>

                    <div className='form-group my-2'>
                        <label>Last Name : </label>
                        <input type='text' placeholder='Last Name' name='last_Name' className='form-control' 
                        value={last_Name} onChange={(e)=>setLastName(e.target.value)}/>
                       
                    </div>

                    <div className='form-group my-2'>
                        <label>Email : </label>
                        <input type='text' placeholder='Email' name='email' className='form-control'
                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                      
                    </div>

                    <button className='btn btn-success mt-3 ms-2' onClick={updateHandler}>Save</button>
                    <button className='btn btn-danger mt-3 ms-2' onClick={cancelHandler}>Cancel</button>
                </form>
            </div>
         </div>
      </div> 
    </div>

  )
}

export default UpdateEmployeeComponent
