import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPlus, FaEllipsisH, FaRegClock, FaRegComment } from 'react-icons/fa';

// Sample data - in a real app, this would come from your backend
const initialTasks = {
  'todo': [
    { id: 'task-1', title: 'Create login page', description: 'Implement user authentication', priority: 'high', assignee: 'John Doe', comments: 3, dueDate: '2023-06-15' },
    { id: 'task-2', title: 'Design dashboard', description: 'Create wireframes for admin dashboard', priority: 'medium', assignee: 'Jane Smith', comments: 1, dueDate: '2023-06-18' },
  ],
  'inprogress': [
    { id: 'task-3', title: 'API integration', description: 'Connect frontend with backend APIs', priority: 'high', assignee: 'Mike Johnson', comments: 5, dueDate: '2023-06-10' },
    { id: 'task-4', title: 'Unit testing', description: 'Write tests for core components', priority: 'medium', assignee: 'Sarah Williams', comments: 0, dueDate: '2023-06-20' },
  ],
  'done': [
    { id: 'task-5', title: 'Project setup', description: 'Initialize project and install dependencies', priority: 'low', assignee: 'Alex Brown', comments: 2, dueDate: '2023-06-05' },
  ],
};

// Priority color mapping
const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

// Column titles and colors
const columns = {
  todo: { title: 'To Do', color: 'bg-gray-100' },
  inprogress: { title: 'In Progress', color: 'bg-blue-100' },
  done: { title: 'Done', color: 'bg-green-100' },
};

export default function KanbanChart() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item is dropped in the same place
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the task that was dragged
    const sourceColumn = tasks[source.droppableId];
    const destinationColumn = tasks[destination.droppableId];
    
    // Create a copy of the source column tasks
    const sourceTasksCopy = [...sourceColumn];
    // Remove the task from the source column
    const [movedTask] = sourceTasksCopy.splice(source.index, 1);
    
    // If moving within the same column
    if (source.droppableId === destination.droppableId) {
      // Insert the task at the new position
      sourceTasksCopy.splice(destination.index, 0, movedTask);
      
      // Update the state
      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasksCopy,
      });
    } else {
      // Create a copy of the destination column tasks
      const destinationTasksCopy = [...destinationColumn];
      // Insert the task at the new position in the destination column
      destinationTasksCopy.splice(destination.index, 0, movedTask);
      
      // Update the state with both columns changed
      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasksCopy,
        [destination.droppableId]: destinationTasksCopy,
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Tasks</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FaPlus className="mr-2" /> Add Task
        </button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(columns).map((columnId) => (
            <div key={columnId} className={`rounded-lg ${columns[columnId].color} p-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-700">{columns[columnId].title}</h2>
                <span className="bg-white text-gray-600 text-sm py-1 px-3 rounded-full">
                  {tasks[columnId].length}
                </span>
              </div>
              
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px]"
                  >
                    {tasks[columnId].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-lg shadow mb-3 cursor-pointer hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-800">{task.title}</h3>
                              <button className="text-gray-400 hover:text-gray-600">
                                <FaEllipsisH />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </span>
                              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                                <div className="flex items-center">
                                  <FaRegComment className="mr-1" />
                                  <span>{task.comments}</span>
                                </div>
                                <div className="flex items-center">
                                  <FaRegClock className="mr-1" />
                                  <span>{task.dueDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                              <div className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">
                                {task.assignee}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              
              <button className="mt-3 w-full py-2 bg-white bg-opacity-50 rounded-lg text-gray-600 hover:bg-opacity-70 transition-colors flex items-center justify-center">
                <FaPlus className="mr-2" /> Add Card
              </button>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
