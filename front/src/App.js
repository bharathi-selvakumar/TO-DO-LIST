import { React, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { RiAddCircleLine } from "react-icons/ri";
import Checkbox from '@mui/material/Checkbox';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const App = ({ title }) => {
  const [item, setItem] = useState([
    {
      id: 1,
      checked: true,
      text: "walk_up"
    },
    {
      id: 2,
      checked: false,
      text: "fresh_up"
    },
    {
      id: 3,
      checked: false,
      text: "boost_up"
    }
  ]);

  const [newTask, setNewTask] = useState('');

  const handleCheck = (id) => {
    console.log(`id=${id}`);
    const checkList = item.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItem(checkList);
    localStorage.setItem("todolist", JSON.stringify(checkList));
  };

  const handleDelete = (id) => {
    console.log(`id=${id}`);
    const deleteList = item.filter((item) => item.id !== id);
    setItem(deleteList);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAdd = (e) => {
    if (e) e.preventDefault(); // Prevent default form submission
    if (newTask.trim()) {
      const newItem = {
        id: item.length ? item[item.length - 1].id + 1 : 1,
        checked: false,
        text: newTask
      };
      const newItemList = [...item, newItem];
      setItem(newItemList);
      setNewTask('');
      localStorage.setItem("todolist", JSON.stringify(newItemList));
    }
  };

  return (
    <>
      <div className='main-todo container-fluid justify-content-center'>
        <h2>{title}</h2>
        <div className='input-box' style={{ display: "flex" }}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 0, width: '60ch' },
              fontStyle: "oblique"
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleAdd} // Add onSubmit handler
          >
            <TextField
              id="outlined-basic"
              label="Enter_the_Task"
              variant="outlined"
              value={newTask}
              onChange={handleChange}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            style={{ maxWidth: "140px", marginLeft: "10px", padding: "10px" }}
            onClick={handleAdd}
          >
            <RiAddCircleLine style={{ width: "25px", height: "25px" }} />Add List
          </Button>
        </div>

        <div className='list_set'>
          {item.length > 0 ? (
            <ol>
              {item.map((data) => (
                <div className='data-table' key={data.id}>
                  <li className='list'>
                    <Checkbox
                      checked={data.checked}
                      style={{ width: "30px", height: "30" }}
                      onChange={() => handleCheck(data.id)}
                    />
                    <label
                      onDoubleClick={() => handleCheck(data.id)}
                      style={data.checked ? { textDecoration: "line-through" } : null}
                    >
                      {data.text}
                    </label>
                    <DeleteRoundedIcon
                      style={{ position: "relative", bottom: "-7px", height: "30px", width: "30px", cursor: "pointer" }}
                      onClick={() => handleDelete(data.id)}
                      role='button'
                      aria-label='It used to delete the List'
                    />
                  </li>
                </div>
              ))}
            </ol>
          ) : (
            <div className='no-data'>
              <h3>No Data Found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

//REACT_props and props drilling
App.defaultProps = {
  title: "TO_DO_LIST"
}

export default App;
