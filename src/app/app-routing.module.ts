import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DogBreedsShowcaseComponent } from './views/dog-breeds-showcase/dog-breeds-showcase.component';


const routes: Routes = [
  { path: 'dog-breeds-showcase', component: DogBreedsShowcaseComponent },
  { path: '**', redirectTo: 'dog-breeds-showcase' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
