import { Test   } from 'cv3-test/Test';

import { Inject } from './Inject';

import { Drink         } from './Drink';
import { Snack         } from './Snack';
import { Soda          } from './Soda';
import { BottleOfWater } from './BottleOfWater';
import { BagOfChips    } from './BagOfChips';
import { BagOfPretzels } from './BagOfPretzels';

import { VendingMachine } from './VendingMachine';

export class VendingMachineTest extends Inject(Test
	, {vendingMachine:  VendingMachine}

	, ({vendingMachine: VendingMachine})=>({
		sodaMachine:      Inject(VendingMachine, {Drink:Soda})
		, waterMachine:   Inject(VendingMachine, {Drink:BottleOfWater})
		, chipMachine:    Inject(VendingMachine, {Snack:BagOfChips})
		, pretzelMachine: Inject(VendingMachine, {Snack:BagOfPretzels})
	})
){
	testGetDrink()
	{
		this.assert(
			this.vendingMachine.getDrink() instanceof Drink
			, 'vendingMachine.getDrink did not return an instance of Soda.'
		);

		this.assert(
			this.sodaMachine.getDrink() instanceof Soda
			, 'sodamachine.getDrink did not return an instance of Soda.'
		);

		this.assert(
			this.waterMachine.getDrink() instanceof BottleOfWater
			, 'waterMachine.getDrink did not return an instance of BottleOfWater.'
		);
	}

	testGetSnack()
	{
		this.assert(
			this.vendingMachine.getSnack() instanceof Snack
			, 'vendingMachine.getSnack did not return an instance of Snack.'
		);

		this.assert(
			this.chipMachine.getSnack() instanceof BagOfChips
			, 'chipMachine.getSnack did not return an instance of BagOfChips.'
		);

		this.assert(
			this.pretzelMachine.getSnack() instanceof BagOfPretzels
			, 'pretzelMachine.getSnack did not return an instance of BagOfPretzels.'
		);
	}
}
