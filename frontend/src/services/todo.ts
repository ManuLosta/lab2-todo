import axios from "axios";

export const fetchTodos = async (token: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const toggleTodoCompletion = async (token: string, id: number) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/todos/${id}`,
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
    `${import.meta.env.VITE_API_URL}/todos`,
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
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/todos/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
