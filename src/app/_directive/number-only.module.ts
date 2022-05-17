import {NgModule} from '@angular/core';
import {NumberOnlyDirective} from './number-only.directive';

@NgModule({
  declarations: [NumberOnlyDirective],
  exports: [NumberOnlyDirective],
})
export class NumberOnlyModule {
}
