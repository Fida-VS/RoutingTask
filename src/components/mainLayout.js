import { Outlet } from "react-router-dom";
import { AddNewTodoForm } from "./addNewTodoForm/addNewTodoForm";
import { Title } from "./Title";

export const MainLayout = ({value, setValue, requestAddNewTodo, getSortedTodos, onSearch}) => {


	return (
		<>
		<Title />
		<AddNewTodoForm value={value} setValue={setValue} requestAddNewTodo={requestAddNewTodo} getSortedTodos={getSortedTodos} onSearch={onSearch}/>
		<Outlet/>
		</>
	);
};
