import React, { useState, useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import useActivityTracker from "../hooks/useActivityTracker";
import "../components/Navbar.js";
import "../components/Footer.js";
import "./TaskManager.css";

const ItemType = "TASK";

const Task = ({ task, moveTask, toggleTimer }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div ref={drag} className="task-box" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p>{task.title}</p>
      <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
      {task.status === "inprogress" && (
        <div className="timer-container">
          <span>⏳ {task.time}s</span>
          <button onClick={() => toggleTimer(task.id)}>
            {task.running ? "Stop" : "Start"}
          </button>
          <div className="activity-stats">
            <p>⌨️ {task.keyboardActivity || 0} | 🖱️ {task.mouseActivity || 0}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Column = ({ title, status, tasks, moveTask, toggleTimer }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => moveTask(item.id, status),
  });

  return (
    <div ref={drop} className="column">
      <h3>{title}</h3>
      {tasks.map((task) => (
        <Task key={task.id} task={task} moveTask={moveTask} toggleTimer={toggleTimer} />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "CRM System Design", status: "todo", priority: "Medium" },
    { id: 2, title: "Statistics", status: "todo", priority: "Low" },
    { id: 3, title: "Notifications", status: "inprogress", priority: "Low", time: 0, running: false, activityId: null },
    { id: 4, title: "Task Types", status: "inprogress", priority: "Low", time: 0, running: false, activityId: null },
    { id: 5, title: "Todoshniki Design", status: "frozen", priority: "Low" },
  ]);

  const token = localStorage.getItem("token");
  const tracker = useActivityTracker();
  const stopListeners = useRef(null);

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const toggleTimer = async (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        if (!task.running) {
          axios.post("http://localhost:4444/activity/start", {}, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            stopListeners.current = tracker.start((stats) => {
              setTasks((tasks) =>
                tasks.map((t) =>
                  t.id === taskId ? { ...t, keyboardActivity: stats.keyboardActivity, mouseActivity: stats.mouseActivity } : t
                )
              );
            });
            setTasks((tasks) =>
              tasks.map((t) =>
                t.id === taskId ? { ...t, running: true, activityId: res.data.activityId } : t
              )
            );
          }).catch(console.error);
        } else if (task.running && task.activityId) {
          const activityData = tracker.stop();
          stopListeners.current?.();

          axios.post("http://localhost:4444/activity/end", {
            activityId: task.activityId,
            ...activityData,
            usedApps: [],
            screenshots: [],
          }, {
            headers: { Authorization: `Bearer ${token}` },
          }).then(() => {
            setTasks((tasks) =>
              tasks.map((t) =>
                t.id === taskId ? { ...t, running: false, activityId: null } : t
              )
            );
          }).catch(console.error);
        }

        return task;
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.running ? { ...task, time: task.time + 1 } : task
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Tasks">
        <Column title="To Do" status="todo" tasks={tasks.filter((task) => task.status === "todo")} moveTask={moveTask} toggleTimer={toggleTimer} />
        <Column title="In Progress" status="inprogress" tasks={tasks.filter((task) => task.status === "inprogress")} moveTask={moveTask} toggleTimer={toggleTimer} />
        <Column title="Closed" status="closed" tasks={tasks.filter((task) => task.status === "closed")} moveTask={moveTask} toggleTimer={toggleTimer} />
      </div>
    </DndProvider>
  );
};

export default Dashboard;
