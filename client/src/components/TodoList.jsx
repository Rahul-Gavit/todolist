import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoAsync,
  completeTodoAsync,
  fetchTodos,
} from "../redux/todosSlice";
import Spinner from "./Spinner";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteTodoAsync(id));
      dispatch(fetchTodos());
    } catch (error) {
      console.log(error);
    }
  };

  const completeHandler = async (id) => {
    try {
      await dispatch(completeTodoAsync(id));
      dispatch(fetchTodos());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTodos())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      {loading && (
        <div className="my-8">
          <Spinner />
        </div>
      )}
      {todoList.map((item) => (
        <div
          key={item._id}
          className={`bg-neutral-600 my-2 p-2 flex-row md:flex justify-between ${
            item.completed ? "line-through" : ""
          }`}
        >
          <div>
            <h1
              className={`text-amber-500 font-semibold text-xl ${
                item.completed ? "line-through text-neutral-400" : ""
              }`}
            >
              {item.title}
            </h1>
            <h2
              className={`text-white ${
                item.completed ? "line-through text-neutral-400" : ""
              }`}
            >
              {item.description}
            </h2>
          </div>
          <div className="mt-2">
            {!item.completed && (
              <button
                className="bg-white text-teal-400 border-2 border-teal-400 px-4 py-1 rounded-2xl mr-2"
                onClick={() => completeHandler(item._id)}
              >
                Complete
              </button>
            )}

            <button
              className="bg-white text-rose-400 border-2 border-rose-400 px-4 py-1 rounded-2xl"
              onClick={() => deleteHandler(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
