import styles from './addNewTodoForm.module.css';

export const AddNewTodoForm = ({ value, setValue, requestAddNewTodo, getSortedTodos, onSearch }) => {



	return (

			<form className={styles.addNewTodoForm}>
				<input
					type="text"
					name="newTodo"
					value={value}
					placeholder='Поиск...'
					onChange={({ target }) => setValue(target.value)}
					className={styles.input}
				/>
				<button onClick={requestAddNewTodo} className={styles.AddNewTodoButton}>Добавить</button>
				<button type='button' onClick={() => getSortedTodos()} className={styles.buttonAlphabeticalSorting}>По алфавиту</button>
				<button type='button' onClick={() => onSearch()} className={styles.buttonSearch}>🔎</button>
			</form>

	);
};
