import { Test   } from 'cv3-test/Test';

import { Inject as I   } from './Inject';

import { Drink         } from './Drink';
import { Snack         } from './Snack';
import { Soda          } from './Soda';
import { BottleOfWater } from './BottleOfWater';
import { BagOfChips    } from './BagOfChips';
import { BagOfPretzels } from './BagOfPretzels';

import { VendingMachine } from './VendingMachine';

export class VendingMachineTest extends I(Test
	, {vendingMachine:  VendingMachine}

	, ({vendingMachine: VendingMachine})=>({
		sodaMachine:      I(VendingMachine, {Drink:Soda})
		, waterMachine:   I(VendingMachine, {Drink:BottleOfWater})
		, chipMachine:    I(VendingMachine, {Snack:BagOfChips})
		, pretzelMachine: I(VendingMachine, {Snack:BagOfPretzels})
	})

	, ({pretzelMachine: PretzelMachine, chipMachine:  ChipMachine}) => ({
		chipsAndWaterMachine:    I(ChipMachine,    {Drink:BottleOfWater})
		, pretzelAndSodaMachine: I(PretzelMachine, {Drink:Soda})
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

		this.assert(
			this.pretzelAndSodaMachine.getDrink() instanceof Soda
			, 'pretzelAndSodaMachine.getDrink did not return an instance of Soda.'
		);

		this.assert(
			this.chipsAndWaterMachine.getDrink() instanceof BottleOfWater
			, 'ChipsAndWaterMachine.getDrink did not return an instance of waterMachine.'
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

		this.assert(
			this.pretzelAndSodaMachine.getSnack() instanceof BagOfPretzels
			, 'pretzelAndSodaMachine.getSnack did not return an instance of BagOfPretzels.'
		);

		this.assert(
			this.chipsAndWaterMachine.getSnack() instanceof BagOfChips
			, 'ChipsAndWaterMachine.getSnack did not return an instance of BagOfChips.'
		);
	}
}
