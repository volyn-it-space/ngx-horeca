import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, TranslateDirective, TranslateService } from '@wawjs/ngx-translate';

const CATERING_TRANSLATION_PATH = '/data/catering/i18n';

@Component({
	imports: [RouterLink, TranslateDirective],
	template: `
		<main class="mx-auto max-w-[var(--container)] px-3 pb-8 pt-3 sm:px-4 sm:pb-10">
			<section class="overflow-hidden rounded-[1.2rem] border border-[var(--c-border)] bg-[var(--c-bg-secondary)] shadow-[var(--shadow-sm)]">
				<div class="border-b border-[var(--c-border)] bg-[linear-gradient(135deg,rgba(197,61,61,0.14),rgba(217,168,88,0.08))] px-4 py-6 sm:px-6 sm:py-8">
					<p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--c-secondary)]">
						<span [translate]="'Catering'">Catering</span>
					</p>
					<h1 class="mt-2 max-w-[44rem] text-2xl font-semibold leading-tight text-[var(--c-text-secondary)] sm:text-4xl">
						<span [translate]="'Food and service packages for private and business events'">
							Food and service packages for private and business events
						</span>
					</h1>
					<p class="mt-3 max-w-[42rem] text-sm leading-6 text-[var(--c-text-muted)] sm:text-base">
						<span [translate]="'Plan birthdays, weddings, corporate meetings, and family celebrations with flexible menu and service formats.'">
							Plan birthdays, weddings, corporate meetings, and family celebrations with flexible menu and service formats.
						</span>
					</p>
				</div>

				<div class="grid gap-3 p-3 sm:grid-cols-3 sm:p-4">
					@for (item of packages; track item.title) {
						<article class="rounded-[1rem] border border-[var(--c-border)] bg-[var(--c-bg-primary)] p-4">
							<div class="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--c-bg-secondary)] text-[var(--c-secondary)]">
								<span class="material-symbols-outlined" aria-hidden="true">{{ item.icon }}</span>
							</div>
							<h2 class="mt-4 text-lg font-semibold text-[var(--c-text-secondary)]">
								<span [translate]="item.title">{{ item.title }}</span>
							</h2>
							<p class="mt-2 text-sm leading-6 text-[var(--c-text-muted)]">
								<span [translate]="item.description">{{ item.description }}</span>
							</p>
						</article>
					}
				</div>

				<section class="border-t border-[var(--c-border)] p-3 sm:p-4" aria-labelledby="catering-process-title">
					<div class="rounded-[1rem] border border-[var(--c-border)] bg-[var(--c-bg-primary)] p-4">
						<p class="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--c-secondary)]">
							<span [translate]="'Planning process'">Planning process</span>
						</p>
						<h2 id="catering-process-title" class="mt-2 text-xl font-semibold text-[var(--c-text-secondary)]">
							<span [translate]="'Tell us the date, guest count, and preferred format'">
								Tell us the date, guest count, and preferred format
							</span>
						</h2>
						<ul class="mt-4 grid gap-3 sm:grid-cols-3">
							@for (item of process; track item) {
								<li class="flex gap-3 text-sm leading-6 text-[var(--c-text-muted)]">
									<span class="material-symbols-outlined mt-0.5 text-[20px] text-[var(--c-secondary)]" aria-hidden="true">
										check_circle
									</span>
									<span [translate]="item">{{ item }}</span>
								</li>
							}
						</ul>
						<a class="ui-btn ui-btn-primary mt-5" routerLink="/socials">
							<span class="material-symbols-outlined" aria-hidden="true">chat</span>
							<span [translate]="&quot;Contact us&quot;">Contact us</span>
						</a>
					</div>
				</section>
			</section>
		</main>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CateringComponent {
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);

	protected readonly packages = [
		{
			icon: 'cake',
			title: 'Birthdays and family parties',
			description: 'Casual sets, desserts, drinks, and serving options for warm celebrations.',
		},
		{
			icon: 'volunteer_activism',
			title: 'Weddings and banquets',
			description: 'Festive menus, timing support, and service details for important dates.',
		},
		{
			icon: 'business_center',
			title: 'Corporate events',
			description: 'Coffee breaks, lunches, dinners, and reception formats for teams and guests.',
		},
	];
	protected readonly process = [
		'Select a package or ask for a custom menu.',
		'Agree on preparation, delivery, setup, and service timing.',
		'Confirm final guest count before the event.',
	];

	constructor() {
		effect(() => {
			if (!this._isBrowser) {
				return;
			}

			void this._translateService.loadExtraTranslation(CATERING_TRANSLATION_PATH, {
				language: this._languageService.language(),
			});
		});
	}
}
