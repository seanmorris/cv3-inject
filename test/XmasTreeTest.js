import { Test   } from 'cv3-test/Test';
import { Inject } from './Inject';

import { XmasTree } from './XmasTree';
import { Lights   } from './Lights';
import { Star     } from './Star';
import { RedStar  } from './RedStar';

export class XmasTreeTest extends Test
{
	testNormalTree()
	{
		const normalTree = new XmasTree;

		this.assert(
			normalTree.star instanceof Star
			, 'normalTree.star is not an instance of Star.'
		);

		this.assert(
			!(normalTree.star instanceof RedStar)
			, 'normalTree.star is an instance of RedStar.'
		);

		this.assert(
			(normalTree instanceof XmasTree)
			, 'normalTree is not an instance of XmasTree.'
		);
	}

	testRedTree()
	{
		const redTree = new (Inject(XmasTree, {
			lights: Inject(Lights, {star: RedStar})
			, star: RedStar
		}));

		this.assert(
			redTree.star instanceof Star
			, 'redTree.star is not instance of Star.'
		);

		this.assert(
			(redTree.star instanceof RedStar)
			, 'redTree.star is not instance of RedStar.'
		);

		this.assert(
			(redTree instanceof XmasTree)
			, 'redTree is not an instance of XmasTree.'
		);
	}

	testSameTree()
	{
		const redStar = new RedStar;

		const sameTree = new (Inject(XmasTree, {
			lights: Inject(Lights, {star: redStar})
			, star: redStar
		}));

		this.assert(
			sameTree.star instanceof Star
			, 'sameTree.star is not an instance of Star.'
		);

		this.assert(
			(sameTree.star instanceof RedStar)
			, 'sameTree.star is not an instance of RedStar.'
		);

		this.assert(
			(sameTree.star === sameTree.lights.star)
			, 'sameTree.star instance is not the same instance as sameTree.lights.star.'
		);

		this.assert(
			(sameTree instanceof XmasTree)
			, 'sameTree is not an instance of XmasTree.'
		);
	}

	testStatic()
	{
		this.assert(
			XmasTree.star === Star
			, 'XmasTree.star is not reference to Star.'
		);

		this.assert(
			Lights.star === Star
			, 'Lights.star is not reference to Star.'
		);

		const RedLights = Inject(Lights, {star: RedStar});

		const RedTree = Inject(XmasTree, {
			lights:   RedLights
			, star:   RedStar
			, Lights: RedLights
			, Star:   RedStar
		});

		this.assert(
			RedTree.star === RedStar
			, 'RedTree.star is not reference to RedStar.'
		);

		const redTree = new RedTree;

		this.assert(
			typeof redTree.Lights === 'function'
			, 'redTree.Lights is not a class.'
		);

		this.assert(
			redTree.Lights === RedLights
			, 'redTree.Lights is not a referemce to class RedLights.'
		);

		this.assert(
			typeof redTree.lights === 'object'
			, 'redTree.Lights is not an object.'
		);

		this.assert(
			redTree.lights instanceof RedLights
			, 'redTree.Lights is not an object of local type "RedLights".'
		);
	}
}
