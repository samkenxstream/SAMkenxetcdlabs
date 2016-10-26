import { Component } from '@angular/core';
import { ParentComponent } from './common.component';

@Component({
    selector: 'app-kubernetes',
    templateUrl: 'kubernetes.component.html',
    styleUrls: ['common.component.css'],
})
export class KubernetesTipComponent extends ParentComponent {
    inputKubernetesVersion: string;
    inputKubernetesGOOS: string;
    inputKubernetesGOARCH: string;
    inputKubernetesExecDir: string;

    constructor() {
        super();

        this.inputKubernetesVersion = 'v1.5.0-alpha.1';
        this.inputKubernetesGOOS = 'linux';
        this.inputKubernetesGOARCH = 'amd64';
        this.inputKubernetesExecDir = '/';
    }

    getKubernetesCommandInstall() {
        let divide = '/';
        if (this.inputKubernetesExecDir === '/') {
            divide = '';
        }
        let txt = `K8S_VER=${this.inputKubernetesVersion}

GOOS=${this.inputKubernetesGOOS}
GOARCH=${this.inputKubernetesGOARCH}

DOWNLOAD_URL=https://storage.googleapis.com/kubernetes-release/release

BINS='kube-apiserver kube-controller-manager kube-scheduler kube-proxy kubelet kubectl'` + `

` + 'for K8S_BIN in ${BINS}; do' + `
    echo "Downloading" ` + '${K8S_BIN}' + `
    ` + 'rm -f /tmp/${K8S_BIN}' + `
    ` + 'curl -L ${DOWNLOAD_URL}/${K8S_VER}/bin/${GOOS}/${GOARCH}/${K8S_BIN} -o /tmp/${K8S_BIN}' + `
    ` + 'sudo chmod +x /tmp/${K8S_BIN}' + `
    `;
        if (this.inputKubernetesExecDir === '/') {
            txt += '# sudo mv /tmp/${K8S_BIN} /usr/local/bin' + `
    `;
        }
        txt += 'sudo mv /tmp/${K8S_BIN} ' + this.inputKubernetesExecDir + `
done


` + this.inputKubernetesExecDir + divide + `kube-apiserver --version
` + this.inputKubernetesExecDir + divide + `kube-controller-manager --version
` + this.inputKubernetesExecDir + divide + `kube-scheduler --version

` + this.inputKubernetesExecDir + divide + `kube-proxy --version
` + this.inputKubernetesExecDir + divide + `kubelet --version

` + this.inputKubernetesExecDir + divide + `kubectl version
`;

        return txt;
    }
}