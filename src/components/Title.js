import { NavLink } from 'react-router-dom';
import styles from '../App.module.css';



export const Title = () => {
	return (
		<div className={styles.title}>
			<h1><NavLink to="/">Todo list</NavLink></h1>
		</div>
	);
};
