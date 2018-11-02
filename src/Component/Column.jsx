import React from "react";
import styled from 'styled-components';
import Task from './Task';
import {Draggable,Droppable} from 'react-beautiful-dnd';
const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
width: 220px
display: flex;
flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
padding: 8px;
transition: background-color 0.2s ease;
background-color: ${props => (props.isDraggingOver ? "skyblue" : "gray")};
flex-grow: 1;
  `;

export default class Column extends React.Component{
  
  RenderLinks = () =>  this.props.links.map((link, index) =>  <Task key={link.id} links={link} index={index} />)
 
    render(){


        return (
      <Draggable draggableId={this.props.category.title}  index={this.props.category.position}>
          {(provided) =>(
             <Container {...provided.draggableProps} innerRef={provided.innerRef} ref={provided.innerRef}>
             <Title {...provided.dragHandleProps}>{this.props.category.title}</Title>
             <Droppable droppableId={this.props.category.title} type="LINK">
             {
                 (provided,snapshot)=>(
                   <TaskList innerRef={provided.innerRef} {...provided.droppableProps}   ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                   {this.RenderLinks()}
                   {provided.placeholder}
                 </TaskList>)
                }
                 
                 </Droppable>
           </Container>

          )}
      </Draggable>
          );
    }

}