import { Test   } from 'cv3-test/Test';

import { Inject as I } from './Inject';

import { XmasTree } from './XmasTree';
import { Lights   } from './Lights';
import { Star     } from './Star';
import { RedStar  } from './RedStar';

export class XmasTreeTest extends I(Test, {
		normalTree:  XmasTree

		, redTree:    I(XmasTree, {
			lights:   I(Lights, {star: RedStar})
			, star:   RedStar
		})

		, sameTree:   I(XmasTree, {
			lights:   I(Lights, {star: RedStar})
			, star:   RedStar
		})

		, RedLights:  I(Lights, {star: RedStar})

	}

	, ({RedLights, normalTree}) => ({
		RedTree:      I(XmasTree, {
			lights:   RedLights
			, star:   RedStar
			, Lights: RedLights
			, Star:   RedStar
		})
		, XmasTree:   normalTree
	})

	, ({RedTree})=>({
		redTree:      RedTree
	})

){
	testNormalTree()
	{
		this.assert(
			this.normalTree.star instanceof Star
			, 'normalTree.star is not an instance of Star.'
		);

		this.assert(
			!(this.normalTree.star instanceof RedStar)
			, 'normalTree.star is an instance of RedStar.'
		);

		this.assert(
			(this.normalTree instanceof XmasTree)
			, 'normalTree is not an instance of XmasTree.'
		);
	}

	testRedTree()
	{
		this.assert(
			this.redTree.star instanceof Star
			, 'redTree.star is not instance of Star.'
		);

		this.assert(
			(this.redTree.star instanceof RedStar)
			, 'redTree.star is not instance of RedStar.'
		);

		this.assert(
			(this.redTree instanceof XmasTree)
			, 'redTree is not an instance of XmasTree.'
		);
	}

	testSameTree()
	{
		const redStar = new RedStar;

		this.assert(
			this.sameTree.star instanceof Star
			, 'sameTree.star is not an instance of Star.'
		);

		this.assert(
			(this.sameTree.star instanceof RedStar)
			, 'sameTree.star is not an instance of RedStar.'
		);

		this.assert(
			(this.sameTree.star === this.sameTree.lights.star)
			, 'sameTree.star instance is not the same instance as sameTree.lights.star.'
		);

		this.assert(
			(this.sameTree instanceof XmasTree)
			, 'sameTree is not an instance of XmasTree.'
		);
	}

	testStatic()
	{
		this.assert(
			this.XmasTree.star === Star
			, 'XmasTree.star is not reference to Star.'
		);

		this.assert(
			Lights.star === Star
			, 'Lights.star is not reference to Star.'
		);

		this.assert(
			this.RedTree.star === RedStar
			, 'RedTree.star is not reference to RedStar.'
		);

		this.assert(
			typeof this.RedTree.Lights === 'function'
			, 'RedTree.Lights is not a class.'
		);

		this.assert(
			this.RedLights == this.RedTree.Lights
			, 'RedTree.Lights is not a reference to class RedLights.'
		);

		this.assert(
			typeof this.redTree.lights === 'object'
			, 'redTree.Lights is not an object.'
		);

		this.assert(
			this.redTree.lights instanceof this.RedLights
			, 'redTree.Lights is not an object of local type "RedLights".'
		);
	}
}
