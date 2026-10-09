import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, TranslateDirective, TranslateService } from '@wawjs/ngx-translate';

const TAKEAWAY_TRANSLATION_PATH = '/data/takeaway/i18n';

@Component({
	imports: [RouterLink, TranslateDirective],
	template: `
		<main class="mx-auto max-w-[var(--container)] px-3 pb-8 pt-3 sm:px-4 sm:pb-10">
			<section class="overflow-hidden rounded-[1.2rem] border border-[var(--c-border)] bg-[var(--c-bg-secondary)] shadow-[var(--shadow-sm)]">
				<div class="border-b border-[var(--c-border)] bg-[linear-gradient(135deg,rgba(197,61,61,0.14),rgba(217,168,88,0.08))] px-4 py-6 sm:px-6 sm:py-8">
					<p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--c-secondary)]">
						<span [translate]="'Takeaway'">Takeaway</span>
					</p>
					<h1 class="mt-2 max-w-[44rem] text-2xl font-semibold leading-tight text-[var(--c-text-secondary)] sm:text-4xl">
						<span [translate]="'Order ahead and pick up fresh meals without waiting'">
							Order ahead and pick up fresh meals without waiting
						</span>
					</h1>
					<p class="mt-3 max-w-[42rem] text-sm leading-6 text-[var(--c-text-muted)] sm:text-base">
						<span [translate]="'Choose dishes from the menu, confirm pickup time, and collect your order from the restaurant pickup point.'">
							Choose dishes from the menu, confirm pickup time, and collect your order from the restaurant pickup point.
						</span>
					</p>
				</div>

				<div class="grid gap-3 p-3 sm:grid-cols-3 sm:p-4">
					@for (item of steps; track item.title; let index = $index) {
						<article class="rounded-[1rem] border border-[var(--c-border)] bg-[var(--c-bg-primary)] p-4">
							<div class="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--c-bg-secondary)] text-[var(--c-secondary)]">
								<span class="material-symbols-outlined" aria-hidden="true">{{ item.icon }}</span>
							</div>
							<p class="mt-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--c-secondary)]">
								{{ index + 1 }}
							</p>
							<h2 class="mt-2 text-lg font-semibold text-[var(--c-text-secondary)]">
								<span [translate]="item.title">{{ item.title }}</span>
							</h2>
							<p class="mt-2 text-sm leading-6 text-[var(--c-text-muted)]">
								<span [translate]="item.description">{{ item.description }}</span>
							</p>
						</article>
					}
				</div>

				<div class="border-t border-[var(--c-border)] p-3 sm:p-4">
					<section class="rounded-[1rem] border border-[var(--c-border)] bg-[var(--c-bg-primary)] p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
						<div>
							<p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--c-secondary)]">
								<span [translate]="'Pickup location'">Pickup location</span>
							</p>
							<h2 class="mt-2 text-xl font-semibold text-[var(--c-text-secondary)]">
								<span [translate]="'Collect orders at the main counter'">Collect orders at the main counter</span>
							</h2>
							<p class="mt-2 text-sm leading-6 text-[var(--c-text-muted)]">
								<span [translate]="&quot;Come to the restaurant entrance, tell us your name or order number, and our team will hand over the packed order.&quot;">
									Come to the restaurant entrance, tell us your name or order number, and our team will hand over the packed order.
								</span>
							</p>
						</div>

						<a class="ui-btn ui-btn-primary mt-4 shrink-0 sm:mt-0" routerLink="/menu">
							<span class="material-symbols-outlined" aria-hidden="true">restaurant_menu</span>
							<span [translate]="'Browse full menu'">Browse full menu</span>
						</a>
					</section>
				</div>
			</section>
		</main>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakeawayComponent {
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	protected readonly steps = [
		{
			icon: 'restaurant_menu',
			title: 'Choose from the menu',
			description: 'Select dishes, drinks, and desserts that travel well for pickup.',
		},
		{
			icon: 'schedule',
			title: 'Confirm preparation time',
			description: 'Most orders can be prepared quickly, while larger orders may need extra time.',
		},
		{
			icon: 'takeout_dining',
			title: 'Pick up your order',
			description: 'Arrive at the agreed time and collect everything packed and ready to go.',
		},
	];

	constructor() {
		effect(() => {
			if (!this._isBrowser) {
				return;
			}

			void this._translateService.loadExtraTranslation(TAKEAWAY_TRANSLATION_PATH, {
				language: this._languageService.language(),
			});
		});
	}
}
