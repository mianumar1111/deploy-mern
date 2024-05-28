import React, { useEffect, useState } from "react";
import "./form.css";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";

const Form = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios.get("https://deploy-mern-xi.vercel.app/get");
      setTodos(result.data);
    };

    fetchTodos();
  }, [task]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (task === "") {
      alert("Please fill the task");
    } else {
      axios.post("https://deploy-mern-xi.vercel.app/add", { task: task });
      setTask("");
    }
  };

  const handleDone = async (id) => {
    const result = await axios.patch(`https://deploy-mern-xi.vercel.app/${id}`);
    setTodos(result.data);
  };

  const handleUnDone = async (id) => {
    const result = await axios.patch(`https://deploy-mern-xi.vercel.app/undone/${id}`);
    setTodos(result.data);
  };

  const handleDel = async (id) => {
    const result = await axios.delete(`https://deploy-mern-xi.vercel.app/${id}`);
    setTodos(result.data);
  };

  return (
    <div className="main">
      <div>
        <h1>TO-DO-LIST</h1>
      </div>

      <form className="form" onSubmit={handleAdd}>
        <input
          id="inputtask"
          type="text"
          placeholder="Enter your task here"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <input id="addbutton" value="Add Task" type="submit" />
      </form>
      <div className="list">
        {todos.length === 0 ? (
          <div>
            <h2>No Task Available</h2>
          </div>
        ) : (
          todos.map((todo, index) => (
            <div className="task" key={index}>
              <div>
                {todo.status === true ? (
                  <div className="listItem">
                    <p
                      onClick={() => {
                        handleUnDone(todo._id);
                      }}
                      className="done"
                      >
                    
                      {todo.task}
                    </p>
                    <p
                      onClick={() => {
                        handleDel(todo._id);
                      }}
                      className="del"
                    >
                      <BsFillTrash3Fill />
                    </p>
                  </div>
                ) : (
                  <div className="listItem">
                    <p
                      onClick={() => {
                        handleDone(todo._id);
                      }}
                    >
                      {todo.task}
                    </p>
                    <p
                      onClick={() => {
                        handleDel(todo._id);
                      }}
                      className="del"
                    >
                      <BsFillTrash3Fill />
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Form;
