import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { userGuard } from './guards/user.guard';
import { postGuard } from './guards/post.guard';
import { roleGuard } from './guards/role.guard';
import { categoryGuard } from './guards/category.guard';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { PostOverviewComponent } from './home/post-overview/post-overview.component';
import { ActivityComponent } from './stats/activity/activity.component';
import { DeletedFilesComponent } from './stats/deleted-files/deleted-files.component';
import { statsGuard } from './guards/stats.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'p/:id', component: PostOverviewComponent, canActivate: [AuthGuard] },

  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard, categoryGuard] },
  { path: 'categories/:id', component: CategoryDetailComponent, canActivate: [AuthGuard, categoryGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard, roleGuard] },
  { path: 'roles/:id', component: RoleDetailComponent, canActivate: [AuthGuard, roleGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, userGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard, userGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard, postGuard] },
  { path: 'posts/:id', component: PostDetailComponent, canActivate: [AuthGuard, postGuard] },
  { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard, statsGuard] },
  { path: 'deleted-files', component: DeletedFilesComponent, canActivate: [AuthGuard, statsGuard] },
];
