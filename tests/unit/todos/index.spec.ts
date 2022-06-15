import Vuex from 'vuex';
import {getModule} from 'vuex-module-decorators';
import {createLocalVue} from '@vue/test-utils';
import {registerStoreModules} from '../../../src/store/modules';
import { ToDoModule } from '../../../src/store/modules/todos/index';
import TodoActions from '@/store/modules/todos/actions';
import { IToDo } from '@/types/todo';

const localVue = createLocalVue();


const todos = [
  {
    userId: 1,
    id: 1,
    title: "Clean car",
    completed: false
  },
  {
    userId: 2,
    id: 1,
    title: "Move to new house",
    completed: false
  },
  {
    userId: 3,
    id: 1,
    title: "Prepare lunch",
    completed: true
  },
  {
    userId: 1,
    id: 2,
    title: "Wash your clothes",
    completed: true
  },
];

describe('Todos Module', function() {
    let store: any;
    let todosInstance: ToDoModule;
  
    beforeEach(function() {
      localVue.use(Vuex);
      store = new Vuex.Store({});
      registerStoreModules(store);
      todosInstance = getModule(ToDoModule, store);
    });
  
    it('should exists', function() {
      expect(todosInstance).toBeDefined();
    });

    it('fetchTodos action should fill todos state', async function() {

      // arrange
      const todosMocked = todos as Array<IToDo>;

       // act
      jest.spyOn(TodoActions, 'fetchTodos').mockImplementation(
        (): Promise<Array<IToDo>> => {
          return Promise.resolve(todosMocked);
        }
      );
      await todosInstance.fetchTodos();

      // assert
      expect(todosInstance.todos.length >0).toEqual(true);
      expect(TodoActions.fetchTodos).toHaveBeenCalled();

    });

    it('completedTodos getter should return only completed todos', async function() {

      // arrange
      const completedTodos = todosInstance.completedTodos;

      // assert
      expect(completedTodos.every((todo:IToDo)=> todo.completed)).toEqual(true);
    });

    it('ON_FETCH_TODOS_STARTED mutation should make loading as true',  function() {

      // act
      todosInstance.ON_FETCH_TODOS_STARTED();

      // assert
      expect(todosInstance.loading).toEqual(true);
    });

    it('ON_FETCH_TODOS_SUCCESS mutation should update given todos',  function() {

      // arrange 
      const todosTest = [
        {
          userId: 13,
          id: 12,
          title: "Move to new city",
          completed: false
        },
        {
          userId: 15,
          id: 21,
          title: "Finish a novel",
          completed: true
        },
      ];
      // act
      todosInstance.ON_FETCH_TODOS_SUCCESS(todosTest);

      // assert
      expect(todosInstance.todos.length).toEqual(2);
      expect(todosInstance.todos).toEqual(todosTest);

    });
});