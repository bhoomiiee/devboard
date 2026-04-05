import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function getDeadlineColor(deadline, done) {
  if (done || !deadline) return "#a0a0c0";
  const diff = new Date(deadline) - new Date();
  if (diff < 0) return "#ff6b6b";
  if (diff < 86400000) return "#ffa94d";
  return "#69db7c";
}

function formatDeadline(deadline) {
  if (!deadline) return null;
  const d = new Date(deadline);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!input.trim()) return;
    await axios.post(`${API}/tasks`, {
      title: input,
      deadline: deadline || null
    });
    setInput("");
    setDeadline("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.patch(`${API}/tasks/${task.id}`, { done: !task.done });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const remaining = tasks.filter(t => !t.done).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      padding: 20
    }}>
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: 20,
        padding: "40px 36px",
        width: "100%",
        maxWidth: 480,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ color: "#fff", fontSize: 28, margin: 0 }}>📋 DevBoard</h1>
          <p style={{ color: "#a0a0c0", margin: "6px 0 0", fontSize: 14 }}>
            {remaining} task{remaining !== 1 ? "s" : ""} remaining
          </p>
        </div>

        {/* Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: 15,
              outline: "none"
            }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                color: deadline ? "#fff" : "#666",
                fontSize: 14,
                outline: "none"
              }}
            />
            <button
              onClick={addTask}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Task List */}
        {tasks.length === 0 && (
          <p style={{ color: "#666", textAlign: "center", marginTop: 40 }}>
            No tasks yet. Add one above!
          </p>
        )}
        {tasks.map((task) => (
          <div key={task.id} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 16px",
            marginBottom: 10,
            background: task.done ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)"
          }}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task)}
              style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#667eea" }}
            />
            <div style={{ flex: 1 }}>
              <p style={{
                margin: 0,
                color: task.done ? "#555" : "#e0e0e0",
                textDecoration: task.done ? "line-through" : "none",
                fontSize: 15
              }}>
                {task.title}
              </p>
              {task.deadline && (
                <p style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  color: getDeadlineColor(task.deadline, task.done)
                }}>
                  📅 {formatDeadline(task.deadline)}
                  {!task.done && new Date(task.deadline) < new Date() && " • Overdue!"}
                  {!task.done && new Date(task.deadline) - new Date() < 86400000 && new Date(task.deadline) > new Date() && " • Due today!"}
                </p>
              )}
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                background: "none",
                border: "none",
                color: "#ff6b6b",
                cursor: "pointer",
                fontSize: 18
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}