import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { ContactService } from '../../feature/contact/contact.service';
import {
	companyEmailHref,
	companyPhoneHref,
	companyProfile,
	companyTranslateVars,
} from '../../feature/company/company.data';

interface SocialContactRequest {
	phone: string;
	message: string;
}

const initialSocialContactRequest = (phone = ''): SocialContactRequest => ({
	phone,
	message: '',
});

@Component({
	imports: [FormField, FormRoot, NgOptimizedImage, TranslateDirective],
	templateUrl: './socials.component.html',
	styleUrl: './socials.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent {
	private readonly _contactService = inject(ContactService);

	protected readonly submittedRequest = signal<SocialContactRequest | null>(null);
	protected readonly submitMessage = signal('');
	protected readonly submitError = signal('');
	protected readonly company = companyProfile;
	protected readonly companyVars = companyTranslateVars;
	protected readonly companyPhoneHref = companyPhoneHref;
	protected readonly companyEmailHref = companyEmailHref;
	protected readonly contactRequest = signal(initialSocialContactRequest(this._contactService.getSavedPhone()));
	protected readonly contactForm = form(
		this.contactRequest,
		(path) => {
			required(path.phone, { message: 'Phone number is required' });
		},
		{
			name: 'socialContact',
			submission: {
				action: async () => {
					if (this.submittedRequest()) {
						return null;
					}

					const request = this._normalizeRequest(this.contactRequest());

					this.submitMessage.set('');
					this.submitError.set('');
					this._contactService.savePhone(request.phone);
					this._sendReport(request);

					return null;
				},
				onInvalid: (field) => {
					field.phone().focusBoundControl();
				},
			},
		},
	);
	private _sendReport(request: SocialContactRequest): void {
		this._contactService.sendReport(this._buildMessage(request)).subscribe({
			next: () => {
				this.submittedRequest.set(request);
				this.submitMessage.set('Message sent');
			},
			error: () => {
				this.submitError.set('Could not send message. Please try again or call us.');
			},
		});
	}

	private _buildMessage(request: SocialContactRequest): string {
		return ['New contact message', `Phone: ${request.phone}`, request.message].filter(Boolean).join('\n');
	}

	private _normalizeRequest(request: SocialContactRequest): SocialContactRequest {
		return {
			phone: request.phone.trim(),
			message: request.message.trim(),
		};
	}
}
