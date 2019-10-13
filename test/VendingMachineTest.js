import { Test } from 'cv3-test/Test';

import { Inject } from './Inject';

import { Drink         } from './Drink';
import { Snack         } from './Snack';
import { Soda          } from './Soda';
import { BottleOfWater } from './BottleOfWater';
import { BagOfChips    } from './BagOfChips';
import { BagOfPretzels } from './BagOfPretzels';

import { VendingMachine } from './VendingMachine';

export class VendingMachineTest extends Inject(Test, {VendingMachine})
{
	testGetDrink()
	{
		const vendingMachine = new this.VendingMachine;
		const sodaMachine    = new (Inject(this.VendingMachine, {Drink:Soda}));
		const waterMachine   = new (Inject(this.VendingMachine, {Drink:BottleOfWater}));

		const drink = vendingMachine.getDrink();

		this.assert(
			drink instanceof Drink
			, 'getDrink did not return an instance of Soda.'
		);

		const soda = sodaMachine.getDrink();

		this.assert(
			soda instanceof Soda
			, 'sodamachine.getDrink did not return an instance of Soda.'
		);

		const bottleOfWater = waterMachine.getDrink();

		this.assert(
			bottleOfWater instanceof BottleOfWater
			, 'waterMachine.getDrink did not return an instance of BottleOfWater.'
		);
	}

	testGetSnack()
	{
		const vendingMachine = new this.VendingMachine;
		const chipMachine    = new (Inject(this.VendingMachine, {Snack:BagOfChips}));
		const pretzelMachine = new (Inject(this.VendingMachine, {Snack:BagOfPretzels}));

		const snack = vendingMachine.getSnack();

		this.assert(
			snack instanceof Snack
			, 'getSnack did not return an instance of Snack.'
		);

		const bagOfChips = chipMachine.getSnack();

		this.assert(
			bagOfChips instanceof BagOfChips
			, 'getSnack did not return an instance of Snack.'
		);

		const bagOfPretzels = pretzelMachine.getSnack();

		this.assert(
			bagOfPretzels instanceof BagOfPretzels
			, 'getSnack did not return an instance of Snack.'
		);
	}
}
