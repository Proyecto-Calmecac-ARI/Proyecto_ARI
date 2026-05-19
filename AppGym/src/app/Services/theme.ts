import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private daltonicMode = false;
    toggleDaltonicMode(): void {
        this.daltonicMode = !this.daltonicMode;
        if (this.daltonicMode) {
            document.body.classList.add('colorblind-mode');
        } else {
            document.body.classList.remove('colorblind-mode');
        }
    }
}