import {Store} from 'vuex';
import {ToDoModule} from './modules/todos';
import {getModule} from 'vuex-module-decorators';

export function registerStoreModules(store: Store<any>) {
  if (!store.hasModule('Todos')) {
    store.registerModule('Todos', ToDoModule);
  }

  // get the modules at initial stage, so that these modules can be used within another store module
  getModule(ToDoModule, store);
}

