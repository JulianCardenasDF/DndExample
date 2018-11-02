import React, { Component } from 'react';
import './App.css';
import Column from "./Component/Column"
import {DragDropContext , Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
const Container = styled.div`
display:
`;


class App extends Component {


constructor(){
  super();
 this.state={
    categories:[]
  };
   
 this.SetIntialState();
}
  SetIntialState  =  () =>{
    let currentState = this.state;
    currentState.categories=this.GenerateCategories(2);
  

    this.setState(currentState);
 }

 GetCategoriesOrder = (categories) => categories.map(c => c.id);
 
 GenerateId = () => Math.floor(Math.random() *10000000);

  GenerateLinks = (int) =>
  {
      let links =[];
     for(var i=0;i<int ; i++){
         links.push({
             id: this.GenerateId()+i, 
             title: "Link "+i,
             url: "http://www.google.com",
             urlText: ""+i,
             position:i
         });
     }
     return links;
  }
 
  GenerateCategories = (int) =>
  {
      let categories =[];
     for(var i=0;i<int ; i++){
         categories.push({
             id: this.GenerateId()+i, 
             title: "Category " +i,
             position:i,
             links: this.GenerateLinks(3)
         });
     }
     return categories;
  }

  GetCategoriesTitle = (categories) => categories.map(c => c.title).sort((current,next)=> current.position-next.position);
    
  onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor="inherit";
    const {destination , source , draggableId , type} = result;

    debugger;
    if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index))   return;
    
    if(type === "CATEGORY"){
     this.MoveCategories(destination , source , draggableId)
    }else{
      this.MoveLinks(destination , source , draggableId)
    }

  
   
  };

  MoveCategories= (destination , source , draggableId) =>{
    const newCategoriesOrder = Array.from(this.state.categories);
    const movedCategory = this.state.categories.find(c => c.title == draggableId)
    newCategoriesOrder.splice(source.index,1);
    newCategoriesOrder.splice(destination.index,0,movedCategory);
    
    let newState =this.state;
    newState.categories = newCategoriesOrder;

    this.setState(newState);
  }

  MoveLinks = (destination , source , draggableId) =>{
    const startCategory = this.state.categories.find(c => c.position == source.droppableId);
    const finishCategory = this.state.categories.find(c => c.position == destination.droppableId)
    if(startCategory.id === finishCategory.id){
      this.MovePosition(startCategory,source.index,destination.index,draggableId);
    } else{
      this.MoveCategory(startCategory,finishCategory,source,destination,draggableId);
    }
  }


  ResetPositions = (links) =>
  {
   return links.map((l,index) => {
      l.position =index
      return l;
    })
  }

  MoveCategory = (startCategory,finishCategory,source,destination,draggableId) =>{
    const startLinks= Array.from(startCategory.links);
    let movedLink = startLinks[source.index];

    startLinks.splice(source.index,1);
    const newStartLinks = {
      ...startCategory,
      links: startLinks
    };

     let finishLinks= Array.from(finishCategory.links);
     finishLinks.splice(destination.index,0,movedLink);
     
     const newFinishLinks = {
       ...finishCategory,
       links: this.ResetPositions(finishLinks)
     }

     let newState = this.state;
     newState.categories[startCategory.position] = newStartLinks;
     newState.categories[finishCategory.position] = newFinishLinks;
  
     this.setState(newState);
    
  }
  MovePosition = (category,source,destination,draggableId) => {

  const links = Array.from(category.links);
  const  movedLink =  links.find(l => l.id == draggableId);
  links.splice(source,1);
  links.splice(destination, 0, movedLink);

  const updatedCategory = {
    ...category,
    links: this.ResetPositions(links)
  };

  let newState = this.state;
 // let indexUpdatedCategory = state.categories.map(function (element) {return element.id;}).indexOf(category.id);
  let sortedCategory = newState.categories.find(c=> category.title ==c.title);
  newState.categories[category.position] = updatedCategory;

  this.setState(newState);
}

  RenderCategories = () =>{
    return this.state.categories.map( currentCategory => {
      const category = this.state.categories.find(c => c.position == currentCategory.position);
      return <Column key={category.id} category={category} links={category.links}></Column> 
      });
  }

 renderDragContext  = () => {
  
  return(
    <DragDropContext onDragEnd ={this.onDragEnd}
                      onDragStart={this.start}>
      <Droppable droppableId="all-categories" direction="vertical" type="CATEGORY">
       
        {(provided) => (
          <Container {...provided.droppableProps} innerRef={provided.innerRef} ref={provided.innerRef}>
            {this.RenderCategories()}
            {provided.placeholder}
          </Container>
        )}
        
       </Droppable>
     </DragDropContext>
     );
  }
 
  render() {
     return (<div>
            {this.renderDragContext()}
            </div>);
  }
  
}

export default App;
