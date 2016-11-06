import { Component } from '@angular/core';
import { ParentComponent } from './common/common.component';

@Component({
    selector: 'app-upgrade-etcd',
    templateUrl: 'upgrade-etcd.component.html',
    styleUrls: ['common/common.component.css'],
})
export class UpgradeEtcdTipComponent extends ParentComponent {
    docVersion: string;
    constructor() {
        super();
        this.docVersion = super.getDocVersion();
    }
}