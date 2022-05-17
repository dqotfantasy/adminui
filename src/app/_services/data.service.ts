import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {LoadingBarService} from '@ngx-loading-bar/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public title = 'Admin';
  public live: BehaviorSubject<{ type: string, data?: any }> = new BehaviorSubject({type: ''});
  public isMobile = new BehaviorSubject(false);
  isLoading: boolean;

  constructor(public breakpointObserver: BreakpointObserver, private loadingBarService: LoadingBarService) {
    loadingBarService.useRef('http').value$.subscribe((v) => {
      this.isLoading = v > 0;
    });
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        this.isMobile.next(state.matches);
      });
  }

  setTitle(title) {
    document.title = this.title + ' | ' + title;
  }

  getHeight(element) {
    let xPosition = 0;
    let yPosition = 0;

    while (element) {
      xPosition += (element.offsetLeft + element.clientLeft);
      yPosition += (element.offsetTop + element.clientTop);
      element = element.offsetParent;
    }

    let h = document.querySelector('body').clientHeight - yPosition;

    if (h < 300) {
      h = 400;
    }
    return h - 1 + 'px';
  }

}
