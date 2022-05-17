import {NgModule} from '@angular/core';
import {DelayInputDirective} from './delay-input.directive';

@NgModule({
  declarations: [DelayInputDirective],
  exports: [DelayInputDirective],
})
export class DelayInputModule {
}
