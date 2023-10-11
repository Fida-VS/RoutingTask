import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './taskPade.module.css';

export const TaskPage = ({setEdit, edit, requestUpdateTodo, setUpdateInputValue, updateInputValue, requestDeleteTodo, refreshTaskFlag, remove, setRemove}) => {

	const navigate = useNavigate();



	const {id} = useParams();
    const [task, setTask] = useState(null);

	useEffect(() => {
     fetch(`http://localhost:3005/todos/${id}`)
	 .then(res => res.json())
	 .then(data => setTask(data))
	}, [id, refreshTaskFlag]);


	const goBack = () => {
		navigate(-1);
	};

	function updateTodo(id, text){
		setEdit(id);
		setUpdateInputValue(text);

	}

	function deleteTask(id){
		requestDeleteTodo(id);
		setRemove(id);
	}

	return(
<div className={styles.taskContainer}>

{remove && (
	<div>Задача была удалена</div>
)}

    {task && (
		<>
		{
			edit === id ?
			<div>
				<textarea onChange={(e)=>setUpdateInputValue(e.target.value)} value={updateInputValue} className={styles.updateInput}/>
			</div>
			: <div className={styles.taskText}><p>{task.text}</p></div>
		}
		{
			edit === id ?
			<div><button type="button" onClick={()=>requestUpdateTodo(id)} className={styles.saveButton}>Сохранить</button></div>
			: <div className={styles.buttonDiv}>
			<button type="button" onClick={() => updateTodo(id, task.text)} className={styles.changeTodo}>🖉</button>
			<button type="button" onClick={() => deleteTask(id)} className={styles.deleteTodo}>✖</button>
			<button type="button" onClick={() => goBack()} className={styles.goBackButton}>←</button>
			</div>
		}
		</>
	)}

</div>
	);
};
