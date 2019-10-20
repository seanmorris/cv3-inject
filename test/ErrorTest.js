import { Test   } from 'cv3-test/Test';

import { Inject as I } from './Inject';

export class ErrorTest extends Test
{
	testError()
	{
		this.expect(Error);

		let i = new I(class{}, {});
	}
}
