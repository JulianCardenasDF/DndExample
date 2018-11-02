const GenerateLinks = (int) =>
{
    let links =[];
   for(var i=0;i<int ; i++){
       links.push({
           id: i, 
           title: "Link "+i,
           url: "http://www.google.com",
           urlText: ""+i,
           position:i
       });
   }
   return links;
}
export default GenerateLinks;

const GenerateCategories = (int) =>
{
    let categories =[];
   for(var i=0;i<int ; i++){
       categories.push({
           id: i,
           title: "Category " +i,
           position:i,
           links: this.GenerateLinks(7)
       });
   }
   return GenerateCategories;
}

const GetCategoriesTitle = (categories) => categories.map(c => c.title).sort((current,next)=> current.position-next.position);
export default GetCategoriesTitle;