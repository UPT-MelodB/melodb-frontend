import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HierarchyComponent } from './components/hierarchy/hierarchy.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'hierarchy', component: HierarchyComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' }
];
