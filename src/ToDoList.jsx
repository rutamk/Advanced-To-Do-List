import React, { useState } from "react";

function ToDoList() {
  // State variables for tasks, new task input, and task completion status
  const [tasks, setTasks] = useState([]); // Array to store tasks
  const [newTask, setNewTask] = useState(""); // Input field for new task
  const [isDone, setIsDone] = useState([]); // Array to track completion status of tasks

  // Function to handle input change in the new task input field
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Function to toggle the completion status of a task
  function doneTask(index) {
    setIsDone(prevState => {
      // Create a copy of the previous state array
      const updatedIsDone = [...prevState];
      // Toggle the boolean value at the specified index
      updatedIsDone[index] = !updatedIsDone[index];
      // Return the updated state
      return updatedIsDone;
    });
  }

  // Function to add a new task to the list
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]); // Add new task to tasks array
      setNewTask(""); // Clear the input field after adding task
      setIsDone(prevState => [...prevState, false]); // Initialize isDone for the new task
    }
  }

  // Function to delete a task from the list
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Filter out task at specified index

    setTasks(updatedTasks); // Update tasks array
    setIsDone(prevState => prevState.filter((_, i) => i !== index)); // Remove corresponding isDone entry

  }

  // Function to move a task up in the list
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      const updatedIsDone = [...isDone];

      // Swap tasks
      [updatedTasks[index], updatedTasks[index - 1]] = 
      [updatedTasks[index - 1],updatedTasks[index]];
      // Swap isDone values
      [updatedIsDone[index], updatedIsDone[index - 1]] = 
      [updatedIsDone[index - 1],updatedIsDone[index]];

      setTasks(updatedTasks); // Update tasks array
      setIsDone(updatedIsDone); // Update isDone array
    }
  }

  // Function to move a task down in the list
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      const updatedIsDone = [...isDone];

      // Swap tasks
      [updatedTasks[index], updatedTasks[index + 1]] = 
      [updatedTasks[index + 1],updatedTasks[index]];
      // Swap isDone values
      [updatedIsDone[index], updatedIsDone[index + 1]] = 
      [updatedIsDone[index + 1],updatedIsDone[index]];

      setTasks(updatedTasks); // Update tasks array
      setIsDone(updatedIsDone); // Update isDone array
    }
  }

  return (
    <div className="to-do-list">
      <h1> To-Do-List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          placeholder="Enter a task..."
          onChange={handleInputChange}
        />
        <button className="add-button" 
                onClick={addTask}> Add </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className={isDone[index] ? "done" : "pending"}>
                {task}
            </span>
            <button className="done-button" 
            onClick={() => doneTask(index)}> {isDone[index] ? "Pending" : "Done"} </button>

            <button className="move-button" 
                    onClick={() => moveTaskUp(index) } 
                    aria-label = "move up"> 👆🏻 </button>

            <button
              className="move-button"
              onClick={() => moveTaskDown(index)}
              aria-label = "move up"> 👇🏻 </button>

            <button className="delete-button" 
            onClick={() => deleteTask(index)}> Delete </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
