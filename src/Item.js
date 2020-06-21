import React from "react";
import cx from "classnames";

const endpoint = "http://localhost:3001/grocery-list";

const updateItem = async (id, item) => {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(item)
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

const deleteItem = async id => {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE"
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const Item = ({ item, onDelete, onUpdate }) => {
  return (
    <li className="flex items-center pt-4">
      <p
        className={cx("flex-1 text-black-600 text-lg", {
          "line-through": item.completed
        })}
      >
        {item.description}
      </p>
      <button
        onClick={async () => {
          const newItem = await updateItem(item.id, {
            ...item,
            completed: !item.completed
          });
          onUpdate(newItem);
        }}
        className={cx(
          "bg-transparent text-blue-500 font-semibold hover:text-blue-700 py-2 px-4 focus:outline-none rounded"
        )}
      >
        {item.completed ? "Undo" : "Got it!"}
      </button>
      {item.completed && (
        <button
          className={cx(
            "ml-4 bg-transparent text-red-500 focus:outline-none font-semibold py-2 px-4 hover:text-red-700 rounded"
          )}
          onClick={async () => {
            await deleteItem(item.id);
            onDelete();
          }}
        >
          Delete
        </button>
      )}
    </li>
  );
};
