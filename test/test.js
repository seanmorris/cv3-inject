import { Inject } from './Inject';

class Star
{
	constructor() {}
	blink() {}
}

class RedStar extends Star
{
	constructor() { super(); }
}

class Lights extends Inject(class{}, {star: Star})
{
	blink() { this.star.blink(); }
}

class XmasTree extends Inject(class{}, {
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

const normalTest = () => {
	console.log('Running NormalTree tests...');

	const normalTree = new XmasTree;

	console.assert(
		normalTree.star instanceof Star
		, 'normalTree.star is not an instance of Star.'
	);

	console.assert(
		!(normalTree.star instanceof RedStar)
		, 'normalTree.star is an instance of RedStar.'
	);

	console.assert(
		(normalTree instanceof XmasTree)
		, 'normalTree is not an instance of XmasTree.'
	);
};

const redTest = () => {
	console.log('Running RedTree tests...');

	const redTree = new (Inject(XmasTree, {
		lights: Inject(Lights, {star: RedStar})
		, star: RedStar
	}));

	console.assert(
		redTree.star instanceof Star
		, 'redTree.star is not instance of Star.'
	);

	console.assert(
		(redTree.star instanceof RedStar)
		, 'redTree.star is not instance of RedStar.'
	);

	console.assert(
		(redTree instanceof XmasTree)
		, 'redTree is not an instance of XmasTree.'
	);
};

const sameTest = () => {
	console.log('Running SameTree tests...');

	const redStar = new RedStar;

	const sameTree = new (Inject(XmasTree, {
		lights: Inject(Lights, {star: redStar})
		, star: redStar
	}));

	console.assert(
		sameTree.star instanceof Star
		, 'sameTree.star is not an instance of Star.'
	);

	console.assert(
		(sameTree.star instanceof RedStar)
		, 'sameTree.star is not an instance of RedStar.'
	);

	console.assert(
		(sameTree.star === sameTree.lights.star)
		, 'sameTree.star instance is not the same instance as sameTree.lights.star.'
	);

	console.assert(
		(sameTree instanceof XmasTree)
		, 'sameTree is not an instance of XmasTree.'
	);
};

const staticTest = () => {
	console.log('Running Static tests...');

	console.assert(
		XmasTree.star == Star
		, 'XmasTree.star is not reference to Star.'
	);

	console.assert(
		Lights.star == Star
		, 'Lights.star is not reference to Star.'
	);

	const RedTree = Inject(XmasTree, {
		lights: Inject(Lights, {star: RedStar})
		, star: RedStar
	});

	console.assert(
		RedTree.star == RedStar
		, 'RedTree.star is not reference to RedStar.'
	);
};

normalTest();
redTest();
sameTest();
staticTest();

console.log('Done.');
