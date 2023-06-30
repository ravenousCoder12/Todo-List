import React from "react";
import moment from "moment";
import { MarkTodoCompletedApi, deleteTodoApi } from "../../services/api";
import { toast } from "react-toastify";


function Todo({ todo ,setRefreshList}) {

  const handleDelete = async() =>{
    const result = await deleteTodoApi({
      todo_id:todo._id 
    })
    console.log("delete todo",result)

    if(result.data.status === 200)
    {
      setRefreshList(new Date())
      toast('Todo Deleted')
    }
    else{
      toast('Failed to delete . Please try again')
    }

  }

  const handleMarkTodoCompleted = async() =>{
    const result = await MarkTodoCompletedApi({
      todo_id:todo._id 
    })
    console.log("Mark todo",result)

    if(result.data.status === 200)
    {
      setRefreshList(new Date())
      toast(result.data.message)
    }
    else{
      toast('Failed to Mark it as completed . Please try again')
    }

  }


  return (
    <div className="cont col-sm-3 mx-2 my-2 alert bg-dark">
      <div className="card-header">
        {todo.isCompleted ? <span style={{ color: "white" }}>Completed</span> : "Not Completed"}
      </div>
      <br />
      <div className="card-body">
        <br />
        <h4 className={`card-title ${todo.isCompleted ? 'completed' : ''}`}  >{todo.desc}</h4>
        
      </div>
      <br />
      <div><p className="card-text  ">{moment(todo.Date).fromNow()}</p></div>
      <br />
      <div className="actionButtons">
          <div className="deleteButton">
            <button className="btn btn-secondary"   onClick={handleDelete} >Delete</button>
          </div>
          <div className="markTodo">
            <button onClick={handleMarkTodoCompleted} className="btn btn-secondary" > {todo.isCompleted? 'Mark Uncomplete':'Mark complete' } </button>
          </div>
        </div>
    </div>
  );
}

export default Todo;


