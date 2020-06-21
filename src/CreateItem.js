import React from "react";

const endpoint = "http://localhost:3001/grocery-list";

const createItem = async body => {
  try {
    const response = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(body)
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const CreateItem = props => {
  const [description, setDescription] = React.useState("");
  return (
    <form
      onSubmit={async evt => {
        evt.preventDefault();
        if (description !== "") {
          setDescription("");
          const newItem = await createItem(description);
          props.onCreate(newItem);
        }
      }}
    >
      <input
        disabled={props.disabled}
        className="bg-white focus:outline-none focus:shadow-outline border border-blue-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        placeholder="What do you need to buy?"
        value={description}
        type="text"
        onChange={evt => {
          setDescription(evt.target.value);
        }}
      />
    </form>
  );
};
