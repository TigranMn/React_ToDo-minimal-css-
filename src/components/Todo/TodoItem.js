import React, { useState } from "react";

export default function TodoItem(props) {
	const { list, deleteItem, markDone, handleSelect, toggleEditMode } = props;
	const [currentValue, setValue] = useState('')


	return list.map((el,i) => {
		return (
			<div key={el.id} className="todoItem">
				<input 
                        onClick={() => handleSelect(el.id)} 
                        className="itemCheckbox" 
                        type={"checkbox"} 
                        id={el.id}>
                </input>
				{el.onEdit ? (
				<input 
                        onChange={(e) => setValue(e.target.value)} 
                        type={"text"} 
                        defaultValue={el.value}></input>
				) : (
				<span onClick={() => {markDone(el.id)}}> 
                    {el.isDone ? <del>{el.value}</del> : el.value } 
                </span>
				)}
				<button onClick={() => { deleteItem(el.id) }}> X </button>
				<button onClick={() => toggleEditMode(el.id, currentValue, el.onEdit)} >
                    {el.onEdit ? "Save" : "Edit"}
                </button>
			</div>
		);
	});
}
