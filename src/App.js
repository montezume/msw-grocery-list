import React from "react";
import useSWR from "swr";
import { CreateItem } from "./CreateItem";
import { Item } from "./Item";
import "./App.css";

const itemsEndpoint = "http://localhost:3001/grocery-list";

const getItem = async () => {
  const response = await fetch(`${itemsEndpoint}/`);
  return await response.json();
};

const ItemApp = () => {
  const key = `${itemsEndpoint}`;

  const { data: items, mutate } = useSWR(key, () => getItem());
  console.log("items", items);

  const loading = !items;

  return (
    <div className="mx-auto max-w-lg pt-4">
      <h1 className="font-semibold text-4xl pb-4">Grocery List</h1>
      <CreateItem
        disabled={loading}
        mutate={mutate}
        onCreate={newItem => {
          mutate([...items, newItem]);
        }}
      />
      {items && items.length > 0 && (
        <ul>
          {items.map(item => {
            return (
              <Item
                item={item}
                key={item.id}
                onUpdate={newItem => {
                  mutate(
                    items.map(listItem => {
                      if (item.id !== listItem.id) {
                        return item;
                      }
                      return newItem;
                    })
                  );
                }}
                onDelete={() => {
                  mutate(items.filter(listItem => listItem.id !== item.id));
                }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ItemApp;
