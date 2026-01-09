import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HierarchyComponent } from './components/hierarchy/hierarchy.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'hierarchy', component: HierarchyComponent },
  { path: 'orders', component: OrderHistoryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-product', component: ProductFormComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'auth', component: AuthComponent }
];
