import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = {
  todo: [
    { id: '1', content: 'Design User Interface' },
    { id: '2', content: 'Implement Authentication' },
  ],
  inProgress: [
    { id: '3', content: 'Develop API Endpoints' },
    { id: '4', content: 'Write Documentation' },
  ],
  completed: [
    { id: '5', content: 'Project Setup' },
    { id: '6', content: 'Database Schema Design' },
  ],
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Get source and destination lists
    const sourceList = Array.from(tasks[source.droppableId]);
    const destList = source.droppableId === destination.droppableId
      ? sourceList
      : Array.from(tasks[destination.droppableId]);

    // Remove from source list
    const [removed] = sourceList.splice(source.index, 1);

    // Insert into destination list
    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceList,
      });
    } else {
      destList.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(tasks).map(([columnId, tasks]) => (
            <div key={columnId} className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 capitalize">{columnId}</h3>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px]"
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-slate-700 p-3 mb-2 rounded-lg shadow hover:bg-slate-600 transition-colors"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}