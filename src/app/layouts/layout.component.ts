import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {

    @ViewChild('testTaskModal') public testTaskModal: ModalDirective;
    @ViewChild('descriptionTestTaskModal') public descriptionTestTaskModal: ModalDirective;
    testTaskModalShow = false;
    isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    constructor() { }

    testTask(open: boolean = true): void {
        if (open) {
            this.testTaskModalShow = true;
            this.testTaskModal.show();
        } else {
            this.testTaskModalShow = false;
            this.testTaskModal.hide();
        }
    }

    descriptionTestTask(open: boolean = true): void {
        if (open) {
            this.descriptionTestTaskModal.show();
        } else {
            this.descriptionTestTaskModal.hide();
        }
    }
}
