import React from "react";
import { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./todo.css";

export default function TodoList() {
	const [todos, setTodos] = useState([]);
	const taskInput = useRef();
	
	const handleAdd = (e) => {
		let value = taskInput.current.value;
		e.preventDefault();
		if (value.trim()) {
			setTodos((prev) => [
				...prev,
				{
					value,
					onEdit: false,
					id: Math.random(),
					isDone: false,
					isSelected: false,
				},
			]);
			taskInput.current.value = "";
		}
	};

	const markDone = (id) => {
		setTodos(
			todos.map((el) => {
				if (el.id === id) el.isDone = !el.isDone;
				return el;
			})
		);
	};

	const handleSelect = (id) => {
		setTodos(
			todos.map((el) => {
				if (el.id === id) el.isSelected = !el.isSelected;
				return el;
			})
		);
	};

	const deleteItem = (id) => {
		setTodos(todos.filter((el) => el.id != id));
	};

	const deleteSelected = () => {
		setTodos(todos.filter((el) => el.isSelected === false));
	};

	const saveChanges = (id, value) => {
		setTodos(
			todos.map((el) => {
				if (el.id === id) {
					el.value = value;
					el.onEdit = false;
				}
				return el;
			})
		);
	};

	const toggleEditMode = (id, value, onEdit) => {
		if (onEdit) {
			saveChanges(id, value);
			return;
		}
		if (todos.some(el => el.onEdit))
			return
		setTodos(
			todos.map((el) => {
				if (el.id === id) el.onEdit = true;
				return el;
			})
		);
	};

	return (
		<div className="wrapper">
			<h1>Todo List</h1>
			<form>
				<input
					ref={taskInput}
					type={"text"}
					placeholder={"Enter a task"}
				></input>
				<button 
               onClick={(e) => handleAdd(e)} type="submit">
					Add
            </button>
			</form>
			<TodoItem
				toggleEditMode={toggleEditMode}
				handleSelect={handleSelect}
				markDone={markDone}
				deleteItem={deleteItem}
				list={todos}
			></TodoItem>
			<button onClick={deleteSelected}>Delete selected</button>
		</div>
	);
}
