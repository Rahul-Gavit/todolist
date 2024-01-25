import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync, fetchTodos } from "../redux/todosSlice";

const AddTodo = () => {
  const [data, setData] = useState({ title: "", description: "" });
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await dispatch(addTodoAsync(data));
      setData({ title: "", description: "" });
      dispatch(fetchTodos());
    } catch (error) {
      console.error(error);
    }
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col sm:flex-row justify-between items-center bg-neutral-600 px-4 py-2">
          <div className="sm:flex gap-4">
            <div className="flex flex-col mb-4 sm:mb-0">
              <label className="text-white mb-1">Name</label>
              <input
                type="text"
                placeholder="name"
                name="title"
                className="px-2 py-1 rounded-md border-2 border-amber-400 focus:outline-none"
                value={data.title}
                onChange={inputHandler}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white mb-1">Description</label>
              <input
                type="text"
                placeholder="description"
                name="description"
                className="px-2 py-1 rounded-md border-2 border-amber-400 focus:outline-none"
                value={data.description}
                onChange={inputHandler}
                required
              />
            </div>
          </div>

          <div>
            <button
              className="bg-amber-500 px-4 py-1 rounded-2xl text-white sm:mt-0 mt-4" // added sm:mt-0 for small devices and mt-4 for other devices
              type="submit"
            >
              Add Todo
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTodo;
