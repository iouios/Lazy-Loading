import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Main = React.lazy(() => import("../Pages/main"));
const Form = React.lazy(() => import("../Pages/pageForm"));
const TodoList = React.lazy(() => import("../Pages/todolist"));
const Todos = React.lazy(() => import("../Pages/todoListandform"));
const Calculate = React.lazy(() => import("../Pages/calculate"));
const Test = React.lazy(() => import("../Pages/test"));


const Router: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/TodoList" element={<TodoList />} />
        <Route path="/Todos" element={<Todos />} />
        <Route path="/Calculate" element={<Calculate />} />
        <Route path="/Test" element={<Test />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default Router;
