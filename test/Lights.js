import { Inject } from './Inject';

import { Star   } from './Star';

export class Lights extends Inject(class{}, {star: Star})
{
	blink() { this.star.blink(); }
}
