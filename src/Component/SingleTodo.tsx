import React, { useRef, useState } from 'react'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import { Todo } from '../model'

 type Props={
    todo:Todo;
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
 }
 
function SingleTodo({todo,todos,setTodos}:Props) {
    const [edit,setEdit]= useState<boolean>(false);
    const [editTodo,setEditTodo]=useState<string>(todo.todo)
   
    const handleDone=(id:number)=>{
        setTodos(todos.map((todo)=>(
            todo.id===id?{...todo, isDone:!todo.isDone}:todo
        )))
    };
    const handleDelete=(id:number)=>{
        setTodos(todos.filter((todo)=>todo.id!==id))
    };
    const handleEdit=(e:React.FormEvent,id:number)=>{
        e.preventDefault();
        setTodos(todos.map((todo)=>(
            todo.id===id?{...todo, todo:editTodo}:todo
        )))
        setEdit(false);
    };
  return (
    <form className='todos__single' onSubmit={(e)=>handleEdit(e,todo.id)}>
            {
                edit? (
                    
                        <input 
                            className='todos__single--edit'
                            value={editTodo} 
                            type='input' 
                            onChange={(e)=>setEditTodo(e.target.value)}
                        />
                       
                ):(
                    
                        todo.isDone?(
                            <s className='todos__single--text'>
                                   {todo.todo}
                             </s>
                        ):(
                            
                            <span className='todos__single--text'>
                                   {todo.todo}
                             </span>
                        )
                    
                )
            }
         
        <div>
            <span className="icon"
             onClick={()=>{
                if(!edit && !todo.isDone){
                    setEdit(!edit);
                 
                }
            }}>
                <AiFillEdit/>
            </span>
            <span className="icon" onClick={()=>handleDelete(todo.id)}>
             <AiFillDelete/>
            </span>
            <span className="icon" onClick={()=>handleDone(todo.id)}>
                <MdDone/>
            </span>
        </div>
    </form>
  )
}

export default SingleTodo