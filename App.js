import './App.css';
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const TASK_BLOCKS = ['Today', 'Tomorrow', 'This Week', 'Next Week', 'Unplanned'];

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Test Task 1', block: 'Unplanned' },
    { id: 2, title: 'Test Task 2', block: 'Unplanned' },
    { id: 3, title: 'Test Task 3', block: 'Unplanned' },
    { id: 5, title: 'Test Task 5', block: 'Unplanned' },
    { id: 6, title: 'Test Task 6', block: 'Unplanned' },
    { id: 7, title: 'Test Task 7', block: 'Unplanned' },
    { id: 8, title: 'Test Task 8', block: 'Unplanned' },
    { id: 9, title: 'Test Task 9', block: 'Unplanned' },
    { id: 10, title: 'Test Task 10', block: 'Unplanned'}
   
    // Add more tasks here as needed
  ]);

  const handleDrop = (taskId, targetBlock) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, block: targetBlock } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
        <h1 className="title" > Drag & Drop Data </h1><br /><br />
         <div className="task-list"><br />
       
        <br/>
        {TASK_BLOCKS.map((block) => (
          <TaskBlock key={block} title={block} tasks={tasks} onDrop={handleDrop} />
        ))}
      </div>
    </DndProvider>
  );
};

const TaskBlock = ({ title, tasks, onDrop }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'task',
    drop: (item) => onDrop(item.taskId, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className={`task-block ${isOver ? 'active' : ''}`} ref={dropRef}>
      <h2>{title}</h2>
      {tasks.map((task) => {
        if (task.block === title) {
          return (
            <Task key={task.id} title={task.title} taskId={task.id} />
          );
        }
        return null;
      })}
    </div>
  );
};

const Task = ({ title, taskId }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'task',
    item: { taskId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className={`task ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
      {title}
    </div>
  );
};

export default TaskList;




// function App() {
//   return (
//     <div className="App">
//       <h1>Drag & Drop Task List</h1>
   
//     </div>
//   );
// }

// export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
