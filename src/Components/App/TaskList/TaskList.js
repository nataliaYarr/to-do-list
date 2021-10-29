import React from 'react';
import './TaskList.css';
import Task from '../Task/Task';
import Masonry from 'react-masonry-css'


function TaskList({ user, tasks, taskListRef, setList, category, setCategory}) {
    const sortDesc = (a, b) => {
        return b.content.createdAt - a.content.createdAt
    }

    const breakpoints = {
        default: 4,
        1024: 3, 
        767: 2,
        600: 1
    }
    return (
        <div className='list grid'>
            {/* <div className='grid-item'>llkmlkmk<img src="./1.png" alt='' /></div>
            <div className='grid-item'>llkmlkmk<img src="./1.png" alt='' /></div> */}
            <Masonry 
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {/* columnClassName={category} > */}
                {tasks
                .sort(sortDesc)
                .map((task, index) => {
                    return (

                

                    <div className={'task category-'+`${task.content.category}`} key={task.id}>
                        <Task user={user} index={index} list={tasks} key={task.id} task={task} setList={setList} 
                        taskListRef={taskListRef} 
                        category={category} setCategory={setCategory} />
                    </div>
                    )
                    
                    })}    
            </Masonry>
        </div>
    )
}



export default TaskList;
