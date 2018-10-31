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
    

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index, 0, draggableId);
   
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
  };

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
let jsx = [];
jsx.push(<div>
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
return jsx;
  }
 
 
  render() {


    return (<div>
{this.renderDragContext()}

    </div>
   

   
    );
  }
  
}

export default App;
