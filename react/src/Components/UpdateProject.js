import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'



export const UpdateProject = () => {
    var id = useParams().id;
    const[data,setdata] = useState('')
    const[projectName,setprojectName]=useState (data.projectName)
    const[description,setdescription] = useState(data.description)
    const[startDate,setstartDate] = useState(data.startDate)
    const[endDate,setendDate] = useState(data.endDate)
    const[estimatedHours,setestimatedHours] = useState(data.description)
    const[technology,settechnology] = useState(data.technology)

    const updateData = () => {
        axios.get(`http://localhost:4000/Project/${id}`).then(res =>{
            setdata(res.data.data)
            console.log(res.data.data)
        })
    }
    
    useEffect(() =>{
        updateData()
    }, [])
    const update = (e) => {
        var updateData = {
            projectName:projectName,
            description: description,
            startDate: startDate,
            endDate: endDate,
            estimatedHours: estimatedHours,
            technology: technology,
            projectId :id
        }
        e.preventDefault()
        window.location.href="http://localhost:3000/Project"
        axios.put(`http://localhost:4000/Project`,updateData).then(res =>{
            console.log(res.data.data);
        })
    }
    return (
        <div>
            <form onSubmit={update}>
            <div class="form-group">
                    <label ><b>Project Name</b></label>
                    <input type="text" class="form-control" id="exampleInputEmail1" defaultValue={data.projectName} 
                    onChange={(e) => setprojectName(e.target.value)} />

            </div>
            <div class="form-group">
                    <label ><b>Description</b></label>
                    <input type="text" class="form-control" id="exampleInputPassword1" defaultValue={data.description} onChange={(e) => setdescription(e.target.value)} />
            </div>
            <div class="form-group">
                    <label ><b>StartDate</b></label>
                    <input type="date" class="form-control" id="exampleInputPassword1" defaultValue={data.startDate} onChange={(e) => setstartDate(e.target.value)} />
            </div>
            <div class="form-group">
                    <label><b>EndDate</b></label>
                    <input type="date" class="form-control" id="exampleInputPassword1" defaultValue={data.endDate} onChange={(e) => setendDate(e.target.value)} />
            </div>
            <div class="form-group">
                    <label ><b>EstimatedHours</b></label>
                    <input type="number" class="form-control" id="exampleInputPassword1" defaultValue={data.estimatedHours} onChange={(e) => setestimatedHours(e.target.value)} />
            </div>
            <div class="form-group">
                    <label ><b>Technology</b></label>
                    <input type="text" class="form-control" id="exampleInputPassword1" defaultValue ={data.technology} onChange={(e) => settechnology(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
