import axios from "axios";

export const fetchTodos = async (token: string) => {
  const response = await axios.get("http://localhost:3000/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const toggleTodoCompletion = async (token: string, id: number) => {
  const response = await axios.patch(
    `http://localhost:3000/todos/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const createTodo = async (token: string, title: string) => {
  const response = await axios.post(
    "http://localhost:3000/todos",
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const deleteTodo = async (token: string, id: number) => {
  const response = await axios.delete(`http://localhost:3000/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
