import { IToDo } from '@/types/todo';
import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';
import TodoActions from './actions';
import * as mutationTypes from './mutation-types';


@Module({namespaced: true, name: "Todos"})
export class ToDoModule extends VuexModule {

  todos:Array<IToDo> = [];
  loading = false;

  get completedTodos(){
    return this.todos.filter((todo:IToDo)=> todo.completed);
  }

  @Mutation
  [mutationTypes.ON_FETCH_TODOS_STARTED]() {
    this.loading = true;
  }

  @Mutation
  [mutationTypes.ON_FETCH_TODOS_SUCCESS](data: Array<IToDo>) {
    this.loading = false;
    this.todos = data;
  }

  @Mutation
  [mutationTypes.ON_FETCH_TODOS_FAILED]() {
    this.loading = false;
    this.todos = [];
  }
    
  @Action({rawError: true})
  public async fetchTodos():Promise<void> {
      try {
          this.context.commit(mutationTypes.ON_FETCH_TODOS_STARTED);
          const response: Array<IToDo> = await TodoActions.fetchTodos();
          this.context.commit(mutationTypes.ON_FETCH_TODOS_SUCCESS, response);
        } catch (error) {
          this.context.commit(mutationTypes.ON_FETCH_TODOS_FAILED);
        }
  }


}