import {
  ComponentPortal,
  ComponentType,
  DomPortalOutlet,
} from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  VERSION,
  ViewChild,
  ViewContainerRef,
  Compiler,
  Injector,
  ChangeDetectorRef,
  Type,
  ComponentFactoryResolver,
  ApplicationRef,
  ElementRef,
  ComponentRef,
} from '@angular/core';
import { CarComponent } from '../features/users/components/car/car.component';
import { UserlistComponent } from '../features/users/components/userlist/userlist.component';
import { UsersModule } from '../features/users/users.module';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('container', { read: ElementRef })
  container: ElementRef<HTMLElement>;
  outlets;

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private cd: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {
    this.outlets = new Map();
  }

  ngOnInit() {}

  onLoad() {
    this.loadComponent(UserlistComponent, {
      data: { name: 'Pedro', bu: 'Analist' },
    });
    this.loadComponent(CarComponent, { name: 'Ford' });
  }
  onUnload() {
    this.unloadComponent(UserlistComponent);
    this.unloadComponent(CarComponent);
  }

  public loadComponent<T>(
    component: ComponentType<T>,
    inputs: { [p: string]: any } = {}
  ) {
    if (this.outlets.get(component)) {
      console.warn('This compoent is already load.');
      return;
    }
    const componentPortal = new ComponentPortal(component);
    const outlet = new DomPortalOutlet(
      this.container.nativeElement,
      this.cfr,
      this.appRef,
      this.injector
    );
    const reference = outlet.attach(componentPortal);
    this.outlets.set(component, outlet);
    for (const key of Object.keys(inputs || {})) {
      reference.instance[key] = inputs[key];
    }
    reference.changeDetectorRef.detectChanges();
  }
  public unloadComponent<T>(component: ComponentType<T>) {
    const outlet = this.outlets.get(component);
    if (outlet) {
      outlet.detach();
      this.outlets.delete(component);
    } else {
      console.warn(
        'Trying to detach a component not attached, did you already detach it?'
      );
    }
  }
}
