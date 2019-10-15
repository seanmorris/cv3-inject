import { Inject } from './Inject';

import { Lights } from './Lights';
import { Star   } from './Star';

export class XmasTree extends Inject(class{}, {
	star: Star
	, lights: Lights
}) {
	constructor()
	{
		super();

		this.star.blink();
		this.lights.blink();
	}
}
