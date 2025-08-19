import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(tasks) {
    const query = new URLSearchParams();
    query.set("title", tasks.title);
    query.set("description", tasks.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 w-full text-left text-white p-2 rounded-md ${
              task.iscompleted && "line-through"
            }`}
          >
            {task.tittle}
          </button>
          <Button onClick={() => onSeeDetailsClick(task)}>
            <ChevronRightIcon />
          </Button>
          <Button onClick={() => onDeleteTaskClick(task.id)}>
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}
