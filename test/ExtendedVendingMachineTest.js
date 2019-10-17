import { Inject as I } from './Inject';

import { VendingMachineTest } from './VendingMachineTest';

export class ExtendedVendingMachineTest extends I(VendingMachineTest, {})
{
}