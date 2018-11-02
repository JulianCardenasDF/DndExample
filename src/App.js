import React, { Component } from 'react';
import './App.css';
import Column from "./Component/Column"
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
const Container = styled.div`
display:
`;


class App extends Component {


constructor(){
  super();
 this.state={
    categories:[],
    categoriesOrder:[]
  };
   
 this.SetIntialState();
}
  SetIntialState  =  () =>{
    let currentState = this.state;
    currentState.categories=this.GenerateCategories(2);
    currentState.categoriesOrder=this.GetCategoriesTitle(currentState.categories);
    this.setState(currentState);
 }

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
             links: this.GenerateLinks(7)
         });
     }
     return categories;
  }

  GetCategoriesTitle = (categories) => categories.map(c => c.title).sort((current,next)=> current.position-next.position);
    
  onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor="inherit";
    const {destination , source , draggableId} = result;

    if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index))   return;
    
    const startCategory = this.state.categories.find(c => c.id == source.droppableId);
    const finishCategory = this.state.categories.find(c => c.id == destination.droppableId)
    if(startCategory === finishCategory){
      this.MovePosition(startCategory,source.index,destination.index,draggableId);
    } else{
      this.MoveCategory(startCategory,finishCategory,source,destination,draggableId);
    }
   
  };

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


 renderDragContext  = () => {
  
  return(<div>
    <DragDropContext onDragEnd ={this.onDragEnd}>
      <Container>
       {this.state.categoriesOrder.map(categoryName => {
       const category = this.state.categories.find(c => c.title == categoryName);
       return <Column key={category.id} category={category} links={category.links}></Column> })}
         </Container>
     </DragDropContext>
     </div>);
  }
 
  render() {
     return (<div>
            {this.renderDragContext()}
            </div>);
  }
  
}

export default App;
