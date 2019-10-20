import { Test } from 'cv3-test/Test';

import { XmasTreeTest       } from './XmasTreeTest';
import { VendingMachineTest } from './VendingMachineTest';
import { ExtendedVendingMachineTest } from './ExtendedVendingMachineTest';
import { ShuffleTest        } from './ShuffleTest';

Test.run(
	XmasTreeTest
	, VendingMachineTest
	, ExtendedVendingMachineTest
	, ShuffleTest
);

