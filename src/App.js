import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import initialData from "./initial-data";
import Column from "./Component/Column"
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
const Container = styled.div`
display:
`;


class App extends Component {
  state = initialData;
  
  onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor="inherit";
    const {destination , source , draggableId} = result;

    if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index))   return;
    
    const startColumn = this.state.columns[source.droppableId]
    const finishColumn = this.state.columns[destination.droppableId]
    if(startColumn == finishColumn){
      this.MovePosition(startColumn,source.index,destination.index,draggableId);
    } else{
      this.MoveColumn(startColumn,finishColumn,source,destination,draggableId);
    }
   
  };

  MoveColumn = (startTasks,finishTasks,source,destination,draggableId) =>{
    const startTaskIds= Array.from(startTasks.taskIds);
    startTaskIds.splice(source.index,1);
    const newStart = {
      ...startTasks,
      taskIds: startTaskIds
    };
    const finishTasksIds= Array.from(finishTasks.taskIds);
    finishTasksIds.splice(destination.index,0,draggableId);
    const newFinish = {
      ...finishTasks,
      taskIds: finishTasksIds
    }

    const newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newStart.id] :newStart,
        [newFinish.id]:newFinish,
      }
    }
    debugger;
    this.setState(newState);
    
  }

  MovePosition = (column,source,destination,draggableId) => {
  const newTaskIds = Array.from(column.taskIds);
  newTaskIds.splice(source,1);
  newTaskIds.splice(destination, 0, draggableId);
 
  const newColumn = {
    ...column,
    taskIds: newTaskIds
  };

  const newState = {
    ...this.state,
    columns: {
      ...this.state.columns,     
       [newColumn.id]: newColumn,
    },
  };

  this.setState(newState);
}


  onDragStart = () =>{
document.body.style.color ='orange';
document.body.style.transition = 'background-color 0.2s ease';
  }

  onDragUpdate = (update) =>{
    const {destination} = update;
    const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;
    document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
  }
    

   renderDragContext  = () => {
return(
<div>
    <DragDropContext
     onDragEnd ={this.onDragEnd}
     onDragUpdate={this.onDragUpdate}
     onDragStart={this.onDragStart}>
      <Container>
       {this.state.columnOrder.map(columnId => {
       const column = this.state.columns[columnId];
       const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
       return <Column key={column.id} column={column} tasks={tasks}></Column> })}
         </Container>
     </DragDropContext>

     </div>
    );

  }
 
 
  render() {


    return (<div>
{this.renderDragContext()}

    </div>
   

   
    );
  }
  
}

export default App;
