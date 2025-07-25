import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AdminAllTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/todos");
      setTodos(res.data.todos || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setLoading(false);
    }
  };




  const deletetodo = async (id) => {
  try {
    const res = await axios.post("http://localhost:3000/api/delete", {
      id: id
    });

    if (res.data.success) {
      alert("Todo deleted successfully");
    } else {
      alert("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    alert("Server error");
  }
};



  // const handleUpdate = async () => {
  //   try {
  //     const res = await axios.put(`http://localhost:3000/api/todos/${todo._id}`, {
  //       task,
  //       date
  //     });

  //     if (res.data.success) {
  //       alert('Todo updated successfully');
  //       onUpdate(); // Refresh todo list
  //     } else {
  //       alert('Failed to update');
  //     }
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     alert('Server error');
  //   }
  // };



  useEffect(() => {
    fetchTodos();
  }, []);

  return (<>
  <AdminNavbar/>
    <div className="max-w-5xl mx-auto mt-6 p-4">
        
      <h1 className="text-3xl font-bold mb-6 text-center text-white bg-blue-700 py-3 rounded">
        All Todo Tasks
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-red-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{todo.title}</td>
                  <td className="px-4 py-2 border">{todo.email}</td>
                  <td className="px-4 py-2 border">{todo.type}</td>
                  <td className="px-4 py-2 border"><span className="text-red-500 cursor-pointer hover:bg-red-600 hover:text-white p-2 rounded-md" onClick={() =>{
                    deletetodo(todo._id)

                  }}>DELETE</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default AdminAllTodo;




