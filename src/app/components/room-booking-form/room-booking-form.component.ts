import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import type { Room } from '@wawjs/ngx-horeca';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { ContactService } from '../../feature/contact/contact.service';
import { companyProfile } from '../../feature/company/company.data';

interface RoomBookingRequest {
	phone: string;
	room: string;
	date: string;
	message: string;
}

const initialRoomBookingRequest = (phone = ''): RoomBookingRequest => ({
	phone,
	room: '',
	date: '',
	message: '',
});

@Component({
	selector: 'app-room-booking-form',
	imports: [FormField, FormRoot, TranslateDirective],
	templateUrl: './room-booking-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomBookingFormComponent {
	private readonly _contactService = inject(ContactService);

	readonly rooms = input<Room[]>([]);
	readonly selectedRoom = input('');
	readonly idPrefix = input('room-booking');

	protected readonly hasRoomSelect = computed(() => !this.selectedRoom().trim());
	protected readonly phoneHelpId = computed(() => `${this.idPrefix()}-phone-help`);
	protected readonly submittedRequest = signal<RoomBookingRequest | null>(null);
	protected readonly submitMessage = signal('');
	protected readonly submitError = signal('');
	protected readonly company = companyProfile;
	protected readonly bookingRequest = signal(initialRoomBookingRequest(this._contactService.getSavedPhone()));
	protected readonly bookingForm = form(
		this.bookingRequest,
		(path) => {
			required(path.phone, { message: 'Phone number is required' });
		},
		{
			name: 'roomBooking',
			submission: {
				action: async () => {
					if (this.submittedRequest()) {
						return null;
					}

					const request = this._normalizeRequest(this.bookingRequest());

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

	private _sendReport(request: RoomBookingRequest): void {
		this._contactService.sendReport(this._buildMessage(request)).subscribe({
			next: () => {
				this.submittedRequest.set(request);
				this.submitMessage.set('Request saved');
			},
			error: () => {
				this.submitError.set('Could not send request. Please try again or call us.');
			},
		});
	}

	private _buildMessage(request: RoomBookingRequest): string {
		return [
			'New room request',
			`Phone: ${request.phone}`,
			request.room ? `Room: ${request.room}` : '',
			request.date ? `Date: ${request.date}` : '',
			request.message ? `Comment: ${request.message}` : '',
		]
			.filter(Boolean)
			.join('\n');
	}

	private _normalizeRequest(request: RoomBookingRequest): RoomBookingRequest {
		return {
			phone: request.phone.trim(),
			room: this.selectedRoom().trim() || request.room.trim(),
			date: request.date.trim(),
			message: request.message.trim(),
		};
	}
}
