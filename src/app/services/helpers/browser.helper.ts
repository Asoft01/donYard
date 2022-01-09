import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class BrowserHelper {

    private static BASE_URL = '';

    constructor(public router: Router) {
    }


    static redirectToLandingPage(): void {
        location.href = BrowserHelper.BASE_URL;
    }

    static redirectToPage(page: string): void {
        window.location.href = this.BASE_URL + '/' + page;
    }

    gotoPage(page: string = ''): void {
        this.router.navigateByUrl(page);
    }

    gotoDashboard(): void {
        this.router.navigateByUrl('dashboard');
    }

    gotoProfileSetup(): void {
        this.router.navigateByUrl('signup/profile');
    }

    gotoSendMoney(): void {
        this.router.navigateByUrl('send-money');
    }

    gotoSellCrypto(): void {
        this.router.navigateByUrl('sell-crypto');
    }

    gotoReceiveCrypto(): void {
        this.router.navigateByUrl('receive-crypto');
    }

    gotoProfile(): void {
        this.router.navigateByUrl('profile');
    }

    gotoSettings(): void {
        this.router.navigateByUrl('settings');
    }

    gotoTransactions(): void {
        this.router.navigateByUrl('transactions');
    }

    gotoRecipients(): void {
        this.router.navigateByUrl('recipients');
    }

    gotoPersonalTransfer(): void {
        this.router.navigateByUrl('send-money/personal-transfer');
    }

    gotoCreateInvoice(): void {
        this.router.navigateByUrl('receive-crypto/create-invoice');
    }

    gotoRequestMoney(): void {
        this.router.navigateByUrl('receive-crypto/request-money');
    }

    gotoLogin(): void {
        this.router.navigateByUrl('/');
    }

    redirectToLogin(): void {
        BrowserHelper.redirectToPage('login');
    }
}
