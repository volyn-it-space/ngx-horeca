import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpService } from '@wawjs/ngx-http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const CONTACT_PHONE_STORAGE_KEY = 'horeca.contact.phone';

@Injectable({
	providedIn: 'root',
})
export class ContactService {
	private readonly _httpService = inject(HttpService);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	sendReport(message: string): Observable<unknown> {
		return this._httpService.post('/api/telegram/contact', {
			slug: environment.companyId,
			message,
		});
	}

	getSavedPhone(): string {
		if (!this._isBrowser) {
			return '';
		}

		return localStorage.getItem(CONTACT_PHONE_STORAGE_KEY) ?? '';
	}

	savePhone(phone: string): void {
		if (!this._isBrowser) {
			return;
		}

		const normalized = phone.trim();

		if (normalized) {
			localStorage.setItem(CONTACT_PHONE_STORAGE_KEY, normalized);
		}
	}
}
