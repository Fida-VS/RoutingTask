import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { TodoList } from './components/todo-list/todo-list';
import { TaskPage } from './components/task-page/task-page';
import { MainLayout } from './components/mainLayout';
import { NotFoundPage } from './components/notFoundPage/notFoundPage';

export const App = () => {
	const [value, setValue] = useState('');
	const [updateInputValue, setUpdateInputValue] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [todos, setTodos] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const [refreshTaskFlag, setRefreshTaskFlag] = useState(false);
	const refreshTask = () => setRefreshTaskFlag(!refreshTaskFlag);

	const [edit, setEdit] = useState(null);
	const [remove, setRemove] = useState(null);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((loadedTodos) => {
				console.log('loadedTodos', loadedTodos);
				setTodos(loadedTodos);
			});
	}, [refreshTodosFlag]);

	const requestAddNewTodo = () => {
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo added, answer of server:', response);
				refreshTodos();
			});
	};

	const requestUpdateTodo = (id) => {
		fetch('http://localhost:3005/todos/' + id, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: updateInputValue,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo updated, answer of server:', response);
				refreshTask();
				refreshTodos();
				setEdit(null);
			});
	};

	const requestDeleteTodo = (id) => {
		fetch('http://localhost:3005/todos/' + id, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo deleted, answer of server:', response);
				refreshTask();
				refreshTodos();
			});
	};

	const filteredTodos = todos.filter((todo) => {
		return todo.text.toLowerCase().includes(value.toLowerCase());
	});

	const onSearch = () => {
		setIsSearching(!isSearching);
		setTodos(filteredTodos);
	};

	const sortedTodos = [...todos].sort((a, b) => {
		if (b.text.toLowerCase() > a.text.toLowerCase()) {
			return -1;
		}
		if (b.text.toLowerCase() < a.text.toLowerCase()) {
			return 1;
		}
		return 0;
	});

	function getSortedTodos() {
		setIsSorted(!isSorted);
		if (isSorted === true) {
			setTodos(sortedTodos);
		} else if (isSorted === false) {
			setTodos(todos);
		}
	}

	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						<MainLayout
							value={value}
							setValue={setValue}
							requestAddNewTodo={requestAddNewTodo}
							getSortedTodos={getSortedTodos}
							onSearch={onSearch}
						/>
					}
				>
					<Route index element={<TodoList todos={todos}/>} />
					<Route
						path="task/:id"
						element={
							<TaskPage
								edit={edit}
								setEdit={setEdit}
								requestUpdateTodo={requestUpdateTodo}
								requestDeleteTodo={requestDeleteTodo}
								updateInputValue={updateInputValue}
								setUpdateInputValue={setUpdateInputValue}
								refreshTaskFlag={refreshTaskFlag}
								remove={remove}
								setRemove={setRemove}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
