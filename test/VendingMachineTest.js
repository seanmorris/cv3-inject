import { Test   } from 'cv3-test/Test';

import { Inject } from './Inject';

import { Drink         } from './Drink';
import { Snack         } from './Snack';
import { Soda          } from './Soda';
import { BottleOfWater } from './BottleOfWater';
import { BagOfChips    } from './BagOfChips';
import { BagOfPretzels } from './BagOfPretzels';

import { VendingMachine } from './VendingMachine';

export class VendingMachineTest extends Inject(Test, {
	vendingMachine:  VendingMachine
	, sodaMachine:   Inject(VendingMachine, {Drink:Soda})
	, waterMachine:  Inject(VendingMachine, {Drink:BottleOfWater})
	, chipMachine:   Inject(VendingMachine, {Snack:BagOfChips})
	, pretzelMachine:Inject(VendingMachine, {Snack:BagOfPretzels})
}){
	testGetDrink()
	{
		const drink = this.vendingMachine.getDrink();

		this.assert(
			drink instanceof Drink
			, 'getDrink did not return an instance of Soda.'
		);

		const soda = this.sodaMachine.getDrink();

		this.assert(
			soda instanceof Soda
			, 'sodamachine.getDrink did not return an instance of Soda.'
		);

		const bottleOfWater = this.waterMachine.getDrink();

		this.assert(
			bottleOfWater instanceof BottleOfWater
			, 'waterMachine.getDrink did not return an instance of BottleOfWater.'
		);
	}

	testGetSnack()
	{
		const snack = this.vendingMachine.getSnack();

		this.assert(
			snack instanceof Snack
			, 'getSnack did not return an instance of Snack.'
		);

		const bagOfChips = this.chipMachine.getSnack();

		this.assert(
			bagOfChips instanceof BagOfChips
			, 'getSnack did not return an instance of Snack.'
		);

		const bagOfPretzels = this.pretzelMachine.getSnack();

		this.assert(
			bagOfPretzels instanceof BagOfPretzels
			, 'getSnack did not return an instance of Snack.'
		);
	}
}
