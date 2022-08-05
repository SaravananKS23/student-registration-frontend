import React from 'react';
import axios from 'axios';

const Students = ()=>{
const [students, setStudents] = React.useState([]);
const [isDeleted,setIsDeleted] = React.useState(false);
React.useEffect(()=>{
    axios.get("https://studentportal23.herokuapp.com/students")
    .then((res)=>setStudents(res.data));
},[isDeleted])

const onDelete = async (rollNo)=>{
    const result = await axios.delete(`https://studentportal23.herokuapp.com/student/delete?rollNo=${rollNo}`);
    if(!result) alert("Ooops something went wrong!");
    else setIsDeleted(true);

}

const renderTable = ()=>{
    return <>
    <h3>List of students</h3>
    <table className='table'>
        <thead>
            <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Roll No</th>
                <th scope='col'>Class</th>
                <th scope='col'>Action</th>
            </tr>
        </thead>
        <tbody>
            {students.map(student=>(
            <tr key={student.rollNo}>
            <td>{student.name}</td>
            <td>{student.rollNo}</td>
            <td>{student.standard}</td>
            <td><button type="submit" className='btn btn-danger' onClick={()=>onDelete(student.rollNo)}>Delete</button>
            </td>
        </tr>

            ))}
        </tbody>

    </table>
    </>
}


return(
<div>
{students?.length?renderTable():null}
</div>

)

}

export default Students;