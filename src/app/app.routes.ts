import { Routes } from '@angular/router';
import { TodoComponent } from './dashboard/components/todo/todo.component';
import { RecetaComponent } from './dashboard/components/receta/receta.component';

export const routes: Routes = [
/*
        {
            path: 'receta',
            title: 'receta',
            loadComponent: () => import('./dashboard/components/todo/todo.component')
            .then(m => m.TodoComponent),
        },
        {
          path: '**',
          pathMatch:'full',
          redirectTo:'task'
      }
          */

      { path: '', component: TodoComponent },
      { path: 'recipe/:id', component: RecetaComponent },
      { path: '**', redirectTo: '' }

];
