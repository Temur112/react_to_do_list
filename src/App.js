import { useState } from "react"

export default function App(){

  

  return<div className="wrapper">
    <Header />
    <Main />
    <Footer />
  </div>
}

// const InitialItems = [
//   {
//     id:1,
//     description:"socks",
//     quantity:5,
//     packed:false,
//   },
//   {
//     id:2,
//     description:"socks",
//     quantity:5,
//     packed:true,
//   }
// ]

function Header(){
  return<header className="header">
    <div className="header__container">
      <h1>Far Away</h1>
    </div>
    
  </header>
}

function Main(){

  const[items, setItems] = useState([]);
  // const[status, setStatus] = useState(false);
  function handleAdding(item){
    setItems(items=>[...items, item]);
  }

  function handleDelete(id){
    setItems(items.filter(item=>item.id !== id));
  }

  function handleStatus(id){
    setItems((items)=>items.map(item=>item.id===id?{...item, packed:!item.packed}:item));
  }

  function handleClearList(){
    setItems([]);
  }
  return <div className="main">
      <Form items addItems={handleAdding}/>
      <ToDoList items = {items} deleteItems={handleDelete} changeStatus={handleStatus} handleClearList={handleClearList}/>
  </div>
}




function Form({addItems}){

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  

  function handleSubmit(e){
    e.preventDefault();
    console.log(e.target.value);
    const newItem = {description, quantity, id:Date.now(), packed:false};
    console.log(newItem);
    addItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return <form className="item-form" onSubmit={handleSubmit}>
    <div className="item-form__container">
      <h3>What do you need your trip</h3>
      <select onChange={(e)=>setQuantity(Number(e.target.value))} value={quantity}>
        {Array.from({length:20}, (_, i)=>i+1).map((num)=>(<option value={num} key={num}>{num}</option>))}
      </select>
      <input type="text" placeholder="item here" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
      <button>Add</button>
    </div>
    
  </form>
}

function ToDoList({items, deleteItems, changeStatus, handleClearList}){

  const [srt, setSrt] = useState("Input");

  let sortedList;

  if(srt === "Input") sortedList = items;
  if(srt === "Description") sortedList = items.slice().sort((a, b)=>a.description.localeCompare(b.description));
  if(srt === "Packed") sortedList = items.slice().sort((a, b)=>Number(a.packed)-Number(b.packed));

  return <div className="todolist">
    <ul className="todolist__container">
      {sortedList.map((item)=><Item item = {item} key={item.id} deleteItems={deleteItems} changeStatus={changeStatus}/>)}
      
    </ul>
    <div>
      <select value={srt} onChange={(e)=>setSrt(e.target.value)}>
        <option>Input</option>
        <option>Description</option>
        <option>Packed</option>
      </select>
      <button onClick={handleClearList}>Clear List</button>
    </div>
  </div>
}

function Item({item, deleteItems, changeStatus}){
  return <li className="item"><span className={item.packed?'done':''}><input type="checkbox" onChange={()=>changeStatus(item.id)}></input>{item.quantity} {item.description}  <button onClick={()=>deleteItems(item.id)}>&times;</button></span></li>
}

function Footer(){

  return <div className="footer">
    <div className="footer__container">You have x items to pack and you already packed x item </div>
  </div>
}