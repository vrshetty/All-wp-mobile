import { NgModule } from '@angular/core';
import { SafePipe } from './safe/safe';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
	declarations: [SafePipe,TimeAgoPipe],
	imports: [],
	exports: [SafePipe,TimeAgoPipe]
})
export class PipesModule {}
