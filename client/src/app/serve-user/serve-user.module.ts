import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { UsersComponent }    from './users/users.component';
import { UserComponent }  from './user/user.component';
import { UserService } from '../_services/user.service';
import { ServeUserRoutingModule } from './serve-user.routing.module';
import { ToolsModule} from '../tools/tools.module';

@NgModule({
  imports: [
    ToolsModule,
    CommonModule,
    FormsModule,
    ServeUserRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserComponent
  ],
  providers: [ UserService ]
})
export class ServeUserModule {}

