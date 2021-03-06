import React , { useState, useEffect, useRef } from 'react';
import './Task.css';

function Task ({ task, taskListRef, category}) {
    const [catOptionsBar, setCatOptionsBar] = useState(false);
    const [changes, setChanges] = useState('');

    function dateStamp (timestamp) {  
         const date = new Date(timestamp);
         const day = date.getDate();
         const month = date.getMonth()+1;
         const  time = month + '.' + day;
         return time;
    }

    function fullSizeImgFun(){
        const app = document.querySelector('.app')
        const getImgContainerId = 'task-img-container-'+`${task.id}`;
        const container = document.getElementById(getImgContainerId);
        container.classList.toggle('task-img-container_full');
        container.style.top = app.scrollTop + 'px';

        const imgFullId = 'task-img-'+`${task.id}`;
        const imgFull = document.getElementById(imgFullId);
        imgFull.classList.toggle('task-img_small');
        imgFull.classList.toggle('task-img_full');
    }
    
    function handleDelete() { taskListRef.doc(task.id).delete() }

    function setText(e){ setChanges(e.target.innerText) }

    function changeTask(){
        changes.length !==0 ? taskListRef.doc(task.id).update({ text: changes }) : 
        !task.content.src ? handleDelete() : console.log('task contains image')
    }

    function handleTaskClick (){
        setCatOptionsBar(!catOptionsBar);
    }

    function changeCategory (arg) {
        taskListRef.doc(task.id).set({ 
            category: arg,
            text: task.content.text ? task.content.text : null,
            createdAt: task.content.createdAt,
            src: task.content.src ? task.content.src : null
        }) 
        setCatOptionsBar(!catOptionsBar);
    }

    return ( 
        <div className='task' id={`${task.id}`}  >

            { task.content.text ? 
            <div id={'task-text-'+ `${task.id}`}
            contentEditable='true'
            suppressContentEditableWarning='true' 
            className='task-text'
            onInput={(e) => setText(e)} 
            onBlur={ changeTask } 
            > 
            { task.content.text } </div> : null } 
   
            {task.content.src ? 
                <div id={ 'task-img-container-'+`${task.id}` } className='task-img-container' >
                    <img id={ 'task-img-'+`${task.id}`} className='task-img_small' src={task.content.src} alt='attachment' 
                    onClick={fullSizeImgFun}/>
                </div> 
            : null}
             
            <div className='right-side-bar'>
                <p>{dateStamp(task.content.createdAt)}</p>
                
                <div 
                id={ 'task-category-'+`${task.id}` }
                 className={`circle-from-task ${ task.content.category === "fun" ? "fun" : task.content.category === "work" ? "work" : 
                    task.content.category === "travel" ? "travel" : task.content.category === "personal" ? "personal": task.content.category === "health" ? "health" : "blank"}`} 
                    onClick={() => handleTaskClick() } />
                
                    {catOptionsBar ? 
                        <div className='dropdown-from-task' >

                            <div className='category-btn'  onClick={ () => changeCategory('fun') } >
                                <div className='circle fun'/>
                                <input className={'category-input-'+`${task.id}`}  type="button" value="Fun"/>
                            </div>

                            <div className='category-btn'
                             onClick={ () => changeCategory('work') } >
                                <div className='circle work'/>
                                <input type="button" value="Work"/>
                            </div>

                            <div className='category-btn'
                              onClick={ () => changeCategory('travel') } >
                                <div className='circle travel'/>
                                <input  type="button" value="Travel"/>
                            </div>

                            <div className='category-btn'
                              onClick={ () => changeCategory('personal') } >
                                <div className='circle personal'/> 
                                <input type="button" value="Personal"/>
                            </div>

                            <div className='category-btn'
                             onClick={ () => changeCategory('health') } >
                                <div className='circle health'/>
                                <input type="button" value="Health"/>
                            </div>

                            <div className='category-btn'
                             onClick={ () => changeCategory('blank') } >
                                <div className='circle blank'/>
                                <input type="button" value="None"/>
                            </div>
                        </div>
                    : null
                    }

                <button className='delete-task-btn' aria-label='Delete note'  onClick={handleDelete}></button>


             </div>
        </div>
    )
}

    export default Task;
