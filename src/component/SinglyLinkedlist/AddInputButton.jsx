import React from "react";
import { InputNumber, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import 'antd/dist/reset.css';
import sleepFun from "./sleepFun";

export default function AddInputButton({
	num,
	setNum,
	name,
	addElement,
	onDelete,
}) {
	const onChangeHandler = (e) => {
		setNum(e);
	};

	const onClickHandle = () => {
		addElement();
	};

	const onDeleteClick = async () => {
		await sleepFun(300);
		onDelete();
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "center",
			}}
		>
			{name === "Insert" && (
				<InputNumber
					style={{ marginTop: "440%" }}
					value={num}
					onChange={onChangeHandler}
				/>
			)}
			{name === "Insert" ? (
				<Button
					type="primary"
					onClick={onClickHandle}
					icon={<PlusCircleOutlined />}
				>
					{name}
				</Button>
			) : (
				<>
					<Button
						style={{ marginTop: "460%" }}
						type="primary"
						danger
						onClick={onDeleteClick}
						icon={<DeleteOutlined />}
					>
						{name}
					</Button>
				</>
			)}
		</div>
	);
}