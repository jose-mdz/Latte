module latte{
	export class SomethingViewBase extends Element<HTMLDivElement>{
		private _lblSomething:Element<HTMLDivElement>;
		get lblSomething():Element<HTMLDivElement> {
			if (!this._lblSomething) {
				this._lblSomething = new Element<HTMLDivElement>(this.find('[data-property=lblSomething]'));
			}
			return this._lblSomething;
		}

		private static _Model:Element<HTMLDivElement>;
		static getModel():Element<HTMLDivElement> {
			if (!this._Model) {
				this._Model = new Element<HTMLDivElement>(Element.find('[data-class=SomethingViewBase]'));
			}
			return this._Model;
		}

		constructor(){
			super(Element.outlet('[data-class=SomethingViewBase]'))
		}
	}
}