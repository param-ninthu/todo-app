import { useState, useCallback } from 'react';
import todoApi from '../api/todoApi';
import toast from 'react-hot-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchTodos = useCallback(async (status) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await todoApi.getAll(status);
      setTodos(response.data.todos || []);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = async (data) => {
    try {
      const response = await todoApi.create(data);
      const newTodo = response.data.todo;
      
      setTodos((prev) => [newTodo, ...prev]);
      
      toast.success('Todo created successfully');
      return newTodo;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const updateTodo = async (id, data) => {
    const originalTodos = [...todos];
    
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, ...data } : todo
      )
    );

    try {
      const response = await todoApi.update(id, data);
      const updatedTodo = response.data.todo;
      
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      
      toast.success('Todo updated successfully');
      return updatedTodo;
    } catch (err) {
      setTodos(originalTodos);
      toast.error(err.message);
      throw err;
    }
  };

  const toggleTodo = async (id) => {
    const originalTodos = [...todos];
    
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      )
    );

    try {
      const response = await todoApi.toggleDone(id);
      const updatedTodo = response.data.todo;
      
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      
      toast.success(updatedTodo.done ? 'Todo completed!' : 'Todo reopened');
      return updatedTodo;
    } catch (err) {
      setTodos(originalTodos);
      toast.error(err.message);
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    const originalTodos = [...todos];
    
    setTodos((prev) => prev.filter((todo) => todo._id !== id));

    try {
      await todoApi.delete(id);
      toast.success('Todo deleted successfully');
    } catch (err) {
      setTodos(originalTodos);
      toast.error(err.message);
      throw err;
    }
  };

  const getFilteredTodos = useCallback(() => {
    if (filter === 'completed') {
      return todos.filter((todo) => todo.done);
    }
    if (filter === 'pending') {
      return todos.filter((todo) => !todo.done);
    }
    return todos;
  }, [todos, filter]);

  const getStats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.done).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  }, [todos]);

  return {
    todos: getFilteredTodos(),
    allTodos: todos,
    loading,
    error,
    filter,
    setFilter,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    stats: getStats(),
  };
};