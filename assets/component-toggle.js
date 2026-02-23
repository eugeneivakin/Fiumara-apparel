if ( typeof ToggleTab !== 'function' ) {

	class ToggleTab extends HTMLElement {

		constructor(){

			super();

			this.titleEl = this.querySelector('[data-js-title]');
			this.contentEl = this.querySelector('[data-js-content]');

			// Bail out if required parts are missing
			if ( !this.titleEl || !this.contentEl ) {
				return;
			}
			// this.titleEl.innerHTML = `${this.titleEl.innerHTML}${this.hasAttribute('data-togglepack-alternate') ? KROWN.settings.symbols.toggle_pack_alternate : KROWN.settings.symbols.toggle_pack}`;

			if ( this.hasAttribute('data-toggle-inert') ) {
				this.toggleInert = true;
			}


			// Open by default if attribute is present
			if ( this.titleEl.hasAttribute('data-open-by-default') ) {
				this.openImmediately();
			}

			this.titleEl.addEventListener('click',this.onClickHandler.bind(this));
			this.titleEl.addEventListener('keydown', e=>{
				if ( e.keyCode == window.KEYCODES.RETURN ) {
					this.onClickHandler();
				}
			})

		}

		onClickHandler(){
			if ( ! this.classList.contains('opened') ) {
				this.classList.add('opened');
				this.titleEl.setAttribute('aria-expanded', 'true');
				this.slideDown(this.contentEl, 200);
				if ( this.toggleInert ) {
					this.contentEl.removeAttribute('inert');
				}
				setTimeout(()=>{
					this.contentEl.querySelector('css-slider')?.resetSlider();
				}, 200);
			} else {
				this.classList.remove('opened');
				this.titleEl.setAttribute('aria-expanded', 'false');
				if ( this.toggleInert ) {
					this.contentEl.setAttribute('inert', '');
				}
				this.slideUp(this.contentEl, 200);
			}
		}

		slideUp(target, duration){
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.boxSizing = 'border-box';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			setTimeout(()=>{
				target.style.display = 'none';
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
			}, duration);
		}
		slideDown(target, duration) {
			target.style.removeProperty('display');
			var display = window.getComputedStyle(target).display;

			if (display === 'none')
				display = 'block';

			target.style.display = display;
			var height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.boxSizing = 'border-box';
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			setTimeout(()=>{
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
			}, duration);
		}

		openImmediately() {
			this.classList.add('opened');
			this.titleEl.setAttribute('aria-expanded', 'true');
			this.contentEl.style.removeProperty('display');
			var display = window.getComputedStyle(this.contentEl).display;
			if ( display === 'none' ) {
				this.contentEl.style.display = 'block';
			}
			this.contentEl.style.removeProperty('height');
			this.contentEl.style.removeProperty('padding-top');
			this.contentEl.style.removeProperty('padding-bottom');
			this.contentEl.style.removeProperty('margin-top');
			this.contentEl.style.removeProperty('margin-bottom');
			this.contentEl.style.removeProperty('overflow');
			this.contentEl.style.removeProperty('transition-duration');
			this.contentEl.style.removeProperty('transition-property');
			if ( this.toggleInert ) {
				this.contentEl.removeAttribute('inert');
			}
		}

	}

  if ( typeof customElements.get('toggle-tab') == 'undefined' ) {
		customElements.define('toggle-tab', ToggleTab);
	}

}

if ( typeof ToggleGroup !== 'function' ) {

	class ToggleGroup extends HTMLElement {

		constructor(){

			super();
			this.querySelectorAll('toggle-tab').forEach(allToggle=>{
				allToggle.querySelector('[data-js-title]').addEventListener('click', ()=>{
					this.querySelectorAll('toggle-tab.opened').forEach(openedToggle=>{
						if ( allToggle !== openedToggle ) {
							openedToggle.onClickHandler();
						}
					});
				});
			});

		}

	}
	
  if ( typeof customElements.get('toggle-group') == 'undefined' ) {
		customElements.define('toggle-group', ToggleGroup);
	}

}