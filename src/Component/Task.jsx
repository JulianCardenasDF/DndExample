import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Handle = styled.div`
width: 20px;
height: 20px;
background-color: orange;
border-radius: 4px;
margin-right: 8px;
`;

export default class Task extends React.Component{
    render(){
        
        return(
        
        <Draggable draggableId={""+this.props.links.id} index={this.props.index} type="NNNJJJLLLOOO">

        {(provided,snapshot) =>(
        
          <Container   {...provided.draggableProps} 
         
          innerRef={provided.innerRef}  
          ref={provided.innerRef}
          isDragging= {snapshot.isDragging}>
            <Handle  {...provided.dragHandleProps}   />
            {this.props.links.title}  
          </Container>)
        }
       
        </Draggable >);
    }
}


