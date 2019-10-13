import { Inject } from './Inject';

import { Drink } from './Drink';
import { Snack } from './Snack';

export class VendingMachine extends Inject(class{}, {Drink, Snack}) {
	getDrink()
	{
		return new this.Drink;
	}

	getSnack()
	{
		return new this.Snack;
	}
}
