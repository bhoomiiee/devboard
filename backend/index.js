const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY:", process.env.SUPABASE_ANON_KEY);
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Get all tasks
app.get("/tasks", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
    console.log("DATA:", data);
  console.log("ERROR:", error);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Add task
app.post("/tasks", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title: req.body.title,
        deadline: req.body.deadline || null
     }])
    .select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// Toggle done
app.patch("/tasks/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ done: req.body.done })
    .eq("id", req.params.id)
    .select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", req.params.id);
  if (error) return res.status(500).json({ error });
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));