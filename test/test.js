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

	const RedLights = Inject(Lights, {star: RedStar});

	const RedTree = Inject(XmasTree, {
		lights:   RedLights
		, star:   RedStar
		, Lights: RedLights
		, Star:   RedStar
	});

	console.assert(
		RedTree.star == RedStar
		, 'RedTree.star is not reference to RedStar.'
	);

	const redTree = new RedTree;

	console.assert(
		typeof redTree.Lights == 'function'
		, 'redTree.Lights is not a class.'
	);

	console.assert(
		typeof redTree.lights !== 'object'
		, 'redTree.Lights is not an object.'
	);

	console.assert(
		redTree.lights instanceof RedLights
		, 'redTree.Lights is not an object of local type "RedLights".'
	);
};

const appName = 'cv3/inject';

const box = (width, ...lines) => {
	console.error('');
	console.error('#'.repeat(width));
	console.error('#', ' '.repeat(width - 4), '#');

	lines.map((line)=>{
		let whitespace = ' '.repeat((width - line.length) - 5);

		console.error('#', line, whitespace, '#')
	});

	console.error('#', ' '.repeat(width - 4), '#');
	console.error('#'.repeat(width));
	console.error('');
};

box(40, `Starting tests of ${appName}...`);

normalTest();
redTest();
sameTest();

box(10, `Done.`);