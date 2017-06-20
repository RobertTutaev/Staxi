import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TypesComponent }    from './types/types.component';
import { TypeComponent }  from './type/type.component';
import { TypeService } from '../_services/type.service';
import { ServeTypeRoutingModule } from './serve-type.routing.module';
import { ToolsModule} from '../tools/tools.module';
import { AuthGuard }    from './../_services/auth-guard.service';
import { AuthService }    from './../_services/auth.service';

@NgModule({
  imports: [
    ToolsModule,
    CommonModule,
    FormsModule,
    ServeTypeRoutingModule
  ],
  declarations: [
    TypesComponent,
    TypeComponent
  ],
  providers: [ 
    TypeService,
    AuthService,
    AuthGuard
  ]
})
export class ServeTypeModule {}

