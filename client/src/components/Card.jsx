import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Spinner from "./Spinner";

const Card = () => {
  return (
    <>
      <div className="m-20 p-4 bg-neutral-700 rounded-xl md:px-40 md:mx-52">
        <h1 className="flex justify-center text-white mb-2 text-xl font-semibold py-4">
          My Todos
        </h1>
        <div>
          <AddTodo />
        </div>
        <div>
          <TodoList />
        </div>
        {/* <div>
          <Spinner />
        </div> */}
      </div>
    </>
  );
};

export default Card;
