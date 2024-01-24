"use client";
import styles from "./page.module.css";
import { useState, useRef } from "react";

type Todo = {
  id: number;
  job: string;
  iscompleted: boolean;
  isFocus: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [job, setJob] = useState<string>("");
  const [selectJob, setSelectJob] = useState<string>("all");

  const handleAddJob = () => {
    const newJob = [
      ...todos,
      { id: Date.now(), job: job, iscompleted: false, isFocus: false },
    ];
    setTodos(newJob);
    setJob("");
  };

  const handleDeleteJob = (id: number) => {
    let detelejob = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id !== id) {
        detelejob.push(todos[i]);
      }
    }
    setTodos(detelejob);
    // setTodos(todos.filter((item) => {
    //   return item.id !== id
    // }))
  };

  const handleDone = (id: number) => {
    const jobDone = [...todos];
    for (let i = 0; i < jobDone.length; i++) {
      if (id === jobDone[i].id) {
        jobDone[i] = { ...jobDone[i], iscompleted: true };
      }
    }
    setTodos(jobDone);
    console.log("job done: ", jobDone);
    console.log("todos: ", todos);
  };

  const handleDeteleDoneJob = () => {
    let deteleDoneJob = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].iscompleted === false) {
        deteleDoneJob.push(todos[i]);
      }
    }
    setTodos(deteleDoneJob);
  };

  const handleDeteleNotDone = () => {
    let deteleNotDone = [];
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].iscompleted !== false) {
        deteleNotDone.push(todos[i]);
      }
    }
    setTodos(deteleNotDone);
  };

  const handleUpdateJob = (id: Number) => {
    let newTodos = [...todos];

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        newTodos[i] = { ...newTodos[i], job };
      }
    }
    setTodos(newTodos);
  };

  let showJobs = todos;
  if (selectJob === "done") {
    showJobs = todos.filter((todo) => todo.iscompleted === true);
  } else if (selectJob === "notDone") {
    showJobs = todos.filter((todo) => todo.iscompleted === false);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.wrapped}>
          <h1 className={styles.header}>JUST DO IT- DO WHAT YOU WANT</h1>

          <div>
            <input
              value={job}
              placeholder="Enter Job..."
              className={styles.inputjob}
              onChange={(e) => setJob(e.target.value)}
            />
            <button className={styles.button} onClick={handleAddJob}>
              Add New Job
            </button>
          </div>

          <div className={styles.listjob}>
            <ul>
              {showJobs.map((todo) => (
                <span>
                  <li
                    key={todo.id}
                    style={{
                      textDecoration: todo.iscompleted
                        ? "line-through"
                        : "none",
                    }}
                  >
                    <span
                      onClick={() => {
                        setJob(todo.job);
                      }}
                      style={{
                        border: todo.isFocus ? "1px solid black" : "none",
                      }}
                      className={styles.jobname}
                    >
                      {todo.job}
                    </span>
                    <span style={{paddingLeft: 15}}>
                      <button
                        className={styles.secondarybutton}
                        onClick={() => handleDeleteJob(todo.id)}
                      >
                        Detele
                      </button>
                      <button
                        className={styles.secondarybutton}
                        onClick={() => handleDone(todo.id)}
                      >
                        Finish
                      </button>
                      <button
                        className={styles.secondarybutton}
                        onClick={() => handleUpdateJob(todo.id)}
                      >
                        Update
                      </button>
                    </span>
                  </li>
                </span>
              ))}
            </ul>
          </div>

          <div>
            <button className={styles.button} onClick={handleDeteleDoneJob}>
              Detele Finish Job
            </button>
            <button className={styles.button} onClick={handleDeteleNotDone}>
              Detele Unfinish Job
            </button>
          </div>

          <div className={styles.select}>
            <label htmlFor="job">
              <strong>Choose:</strong>
            </label>
            <select
              value={selectJob}
              className={styles.selective}
              onChange={(e) => setSelectJob(e.target.value)}
              name="job"
              id="job"
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="notDone">Not Done</option>
            </select>
          </div>

          <div className={styles.statistical}>
            <p>Work list: {todos.length} </p>
            <p>
              Complete :{" "}
              {todos.filter((job) => job.iscompleted === true).length}
            </p>
            <p>
              Uncomplete :{" "}
              {todos.filter((job) => job.iscompleted === false).length}{" "}
            </p>
          </div>

          <h2>Don’t watch the clock, do what it does. Keep Going</h2>
        </div>
      </div>
    </main>
  );
}
