import {React,useState} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { RiAddCircleLine, RiDeleteBack2Fill } from "react-icons/ri";
import { Checkbox, } from '@mui/material';
// import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const App=({title})=> {
 
  const [item,setitem]=useState([
    {
      id:1,
      checked:true,
      text:"walk_up"
    },
    {
      id:2,
      checked:false,
      text:"fresh_up" 
    },
    {
      id:3,
      checked:false,
      text:"boost_up"
    }
  ])

  const handlecheck=(id)=>{
    console.log(`id=${id}`)
    const check_list=item.map((item)=>
      item.id==id ? {...item,checked:!item.checked} : item)
    setitem(check_list)
    localStorage.setItem("todolist", JSON.stringify(check_list))
  }

  const handledelete=(id)=>{
    console.log(`id=${id}`)
    const delet_list=item.filter((item)=>
    item.id!==id)
    setitem(delet_list)
  }

  const handlechange=(e)=>{
    console.log("submitted")
  }

  return (
    <>
     <div className='main-todo container-fluid  justify-content-center '>
      <h2>{title}</h2>
         <div className='input-box' style={{display:"flex"}}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m:0, width: '60ch' },
              fontStyle:"oblique"
            }}
            noValidate
            autoComplete="off"
            >
              <TextField id="outlined-basic" label="Enter_the_Task" variant="outlined"  onChange={(e)=>handlechange(e.target.value)} />
            </Box>
            <Button variant="contained" color="success" style={{maxWidth:"140px",marginLeft:"10px",padding:"10px"}}>
                <RiAddCircleLine style={{width:"25px",height:"25px"}} />Add List
            </Button>
         </div>

         <div className='list_set'>
          {(item.length>0)?(
          <ol>
              {item.map((data)=>(
                <div className='data-table'>
                  <li key={data.id} className='list'>
                    <Checkbox checked={data.checked} style={{width:"30px",height:"30"}} onChange={()=>handlecheck(data.id)} />
                    {/* {index} */}
                    <label onDoubleClick={()=>handlecheck(data.id)} style={(data.checked)?{textDecoration:"line-through"}:null}>{data.text}</label>
                    <DeleteRoundedIcon style={{position:"relative",bottom:"-7px",height:"30px",width:"30px",cursor:"pointer"}}onClick={()=>handledelete(data.id)}   role='button' aria-label='It used to delete the List'/>
                    {/* <RiDeleteBack2Fill onClick={()=>handledelete(data.id)}   role='button'/> */}
                  </li>
                </div>
              ))}
          </ol>)
          :
          <div className='no-data'>
            <h3>No Data Found</h3>
          </div>
          }
         </div>

     </div>
    </>
  );
}
//REACT_props and props drilling  
App. defaultProps={
  title:"TO_DO_LIST"
}
//
export default App;
