import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Trash2, LogOut, Plus } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

interface TodoListProps {
  user: User;
}

export const TodoList = ({ user }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch todos",
        variant: "destructive",
      });
    } else {
      setTodos(data || []);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("todos").insert({
      title: newTodo,
      user_id: user.id,
      completed: false,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setNewTodo("");
      fetchTodos();
    }
    setLoading(false);
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      fetchTodos();
      toast({
        title: "Deleted",
        description: "Todo removed successfully",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary-glow/5 to-accent/5 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-muted-foreground mt-1">{user.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Card className="p-6 mb-6 shadow-lg border-0 bg-card/50 backdrop-blur">
          <form onSubmit={addTodo} className="flex gap-2">
            <Input
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={loading}
              className="gap-2 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </form>
        </Card>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <Card className="p-8 text-center shadow-lg border-0 bg-card/50 backdrop-blur">
              <p className="text-muted-foreground">
                No todos yet. Add one to get started!
              </p>
            </Card>
          ) : (
            todos.map((todo) => (
              <Card
                key={todo.id}
                className="p-4 flex items-center gap-3 group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id, todo.completed)}
                  className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {todo.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {todos.filter((t) => !t.completed).length} of {todos.length} tasks remaining
          </div>
        )}
      </div>
    </div>
  );
};
