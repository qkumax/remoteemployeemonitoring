import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import '../components/Navbar.js';
import '../components/Footer.js';
import './TaskManager.css';


const ItemType = "TASK";

// Task Component (Draggable)
const Task = ({ task, moveTask, toggleTimer }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="task-box" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <p>{task.title}</p>
      <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>

      {/* Timer for "In Progress" Tasks */}
      {task.status === "inprogress" && (
        <div className="timer-container">
          <span>⏳ {task.time}s</span>
          <button onClick={() => toggleTimer(task.id)}>
            {task.running ? "Stop" : "Start"}
          </button>
        </div>
      )}
    </div>
  );
};

// Column Component (Drop Target)
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

// Main Dashboard Component
const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "CRM System Design", status: "todo", priority: "Medium" },
    { id: 2, title: "Statistics", status: "todo", priority: "Low" },
    { id: 3, title: "Notifications", status: "inprogress", priority: "Low", time: 0, running: false },
    { id: 4, title: "Task Types", status: "inprogress", priority: "Low", time: 0, running: false },
    { id: 5, title: "Todoshniki Design", status: "frozen", priority: "Low" },
  ]);

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };


  const toggleTimer = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, running: !task.running } : task
      )
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
