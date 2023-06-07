import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface User {
  name: string;
  bu: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  @Input() data: { name: string; bu: string };

  public usersInCompany$ = new BehaviorSubject([
    { name: 'Mike Smith', bu: 'Marketing' },
    { name: 'Lucy Marscilla', bu: 'Digital' },
    { name: 'Franck Travis', bu: 'Customer' },
    { name: 'Isabella Martinez', bu: 'Products' },
  ]);

  constructor() {}

  ngOnInit() {
    this.usersInCompany$.next([{ name: this.data.name, bu: this.data.bu }]);
  }
}
