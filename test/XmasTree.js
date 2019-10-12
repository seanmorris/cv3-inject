import { Inject } from './Inject';

import { Lights } from './Lights';
import { Star   } from './Star';

export class XmasTree extends Inject(class{}, {
	lights: Lights
	, star: Star
}) {
	constructor()
	{
		super();

		this.star.blink();
		this.lights.blink();
	}
}
