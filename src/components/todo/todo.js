
import { NavLink } from 'react-router-dom';
import styles from './todo.module.css';


export const Todo = ({text, id}) => {

	const FINAL_TEXT = cutText(text);

	function cutText(text){
		if(text.length > 50){
			return text.slice(0, 40) + '…';
		} else {
			return text;
		}
	}

	return (
		<>
		<li className={styles.todo}>

			 <NavLink to={`task/${id}`}>{FINAL_TEXT}</NavLink>


		</li>

		</>
	);
};




