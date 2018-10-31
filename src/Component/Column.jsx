import React from "react";
import styled from 'styled-components';
import Task from './Task';
import {Droppable} from 'react-beautiful-dnd';
const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
display: flex;
flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
padding: 8px;
transition: background-color 0.2s ease;
background-color: ${props => (props.isDraggingOver ? "skyblue" : "red")};
flex-grow: 1;
  `;

export default class Column extends React.Component{

    render(){
        return (
      
            <Container>
              <Title>{this.props.column.title}</Title>
              <Droppable droppableId={this.props.column.id}   >
              {
                  (provided,snapshot)=>(
                    <TaskList innerRef={provided.innerRef} {...provided.droppableProps}   ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                    {this.props.tasks.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>)
                 }
                  
                  </Droppable>
            </Container>
          
          );
    }

}