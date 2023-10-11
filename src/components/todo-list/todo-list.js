
import styles from './todo-list.module.css';
import { Todo } from '../todo/todo';


export const TodoList = ({todos}) => {

	return (
		<>

			<ul className={styles.todoList}>
				{todos.map(({ id, text }) => (
					<Todo
						key={id}
						text={text}
						id={id}
					/>
				))}

			</ul>
		</>
	);
};
