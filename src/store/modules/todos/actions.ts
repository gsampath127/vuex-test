import { IToDo } from "@/types/todo";

export default class TodoActions {

    public static async fetchTodos(): Promise<Array<IToDo>> {
            
         const todos = await fetch("https://jsonplaceholder.typicode.com/todos")
                .then((response) => response.json());

         return (todos as Array<IToDo>);
    }

}