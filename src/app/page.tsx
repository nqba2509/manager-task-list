"use client";
import { todo } from "node:test";
import styles from "./page.module.css";
import { useState } from "react";

type Todo = {
  job: string;
  iscompleted: boolean;
  isFocus: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [job, setJob] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [selectJob, setSelectJob] = useState<string>("all");

  const handleAddJob = () => {
    const newJob = [...todos, { job: job, iscompleted: false, isFocus: false }];
    setTodos(newJob);
    setJob("");
  };

  const handleDeleteJob = (index: number) => {
    let updataTodos = [...todos];
    if(index >= 0 && index < updataTodos.length) {
      updataTodos.slice(index,1)
    }
    setTodos(updataTodos)
  };

  const handleDone = (index: number) => {
    const jobDone = [...todos];
    for (let i = 0; i < jobDone.length; i++) {
      if (index === i) {
        jobDone[i] = { ...jobDone[i], iscompleted: true };
      }
    }
    setTodos(jobDone);
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


  const handleShowEdit = (todo: Todo, index: number) => {
    setJob(todo.job);
    setEditMode(true);
    setEditIndex(index);
  };


  const handleUpdateJob = () => {
    let updateTodos = [...todos];
    updateTodos[editIndex] = { ...updateTodos[editIndex], job: job };
    setTodos(updateTodos);
    setJob('')
    setEditMode(false)
    setEditIndex(0)
  };

  const handleCompleteAll = () => {
    const completeAllJob = [...todos];
    for(let i = 0; i < completeAllJob.length; i++) {
      completeAllJob[i] = { ...completeAllJob[i], iscompleted: true };
    }
    setTodos(completeAllJob)
  }

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
            {editMode ? (
              <button className={styles.button} onClick={handleUpdateJob}>
                Update
              </button>
            ) : (
              <button className={styles.button} onClick={handleAddJob}>
                Add New Job
              </button>
            )}
          </div>

          <div className={styles.listjob}>
            <ul>
              {showJobs.map((todo, index) => (
                <span>
                  <li
                    key={index}
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
                    <span style={{ paddingLeft: 15 }}>
                      <button
                        className={styles.secondarybutton}
                        onClick={() => handleDeleteJob(index)}
                      >
                        Detele
                      </button>

                      <button
                        className={styles.secondarybutton}
                        onClick={() => handleDone(index)}
                      >
                        Finish
                      </button>

                      <button
                        className={styles.secondarybutton}
                        onClick={() => handleShowEdit(todo, index)}
                      >
                        Edit
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
            <button className={styles.button} onClick={handleCompleteAll}>
              Complete All 
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
