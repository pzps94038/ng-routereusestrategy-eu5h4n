import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { AppRoutingCache } from './app-routing-cache';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
  { path: 'page1', component: Page1Component, data: { keep: true } },
  { path: 'page2', component: Page2Component },
  { path: '', redirectTo: '/page1', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: AppRoutingCache }],
})
export class AppRoutingModule {}
