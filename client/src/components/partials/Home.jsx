import React, { useEffect } from "react";
import Header from "./Header";
import Todo from "./Todo";
import AddTodoModal from "./AddTodoModal";
import { getTodoListApi, getToken } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigation = useNavigate();

  const [list, setList] = useState([]);

  const [refreshList, setRefreshList] = useState();

  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList();
  }, [navigation, refreshList]);

  async function fetchTodoList() {
    const result = await getTodoListApi();
    console.log("todolist", result);

    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  }

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {list.map((todo) => (
            <Todo todo={todo} key={todo._id} />
          ))}
        </div>
      </div>

      <div
        className=""
        style={{ position: "fixed", right: 80, bottom: 80, zIndex: 1000 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>

      <AddTodoModal setRefreshList={setRefreshList} />
    </div>
  );
}

export default Home;
