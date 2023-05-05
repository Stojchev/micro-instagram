import { Component, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
newPhoto() {
throw new Error('Method not implemented.');
}
  title = 'micro-instagram';
  showButtons=false;
  constructor(private router: Router) {
  }
  @ViewChild(RouterOutlet, { static: true })
  routerOutlet: RouterOutlet = new RouterOutlet;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let componentName = this.getComponentName(this.router.routerState.snapshot.root);
        this.showButtons=false;
        if(componentName=='EditProductComponent'){
          this.showButtons=true;
        }
      }
    });
  }

  private getComponentName(routeSnapshot: ActivatedRouteSnapshot): string {
    if (routeSnapshot.firstChild) {
      return this.getComponentName(routeSnapshot.firstChild);
    }

    return routeSnapshot.component?.name ?? '';
  }

}
