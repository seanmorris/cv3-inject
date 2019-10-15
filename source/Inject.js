const injectionSymbol = Symbol('injection');
const instanceSymbol  = Symbol('instance');

const getParentInjection  = Symbol('getParentInjection');
const parentInjector      = Symbol('parent');

const Inject = (baseClass, injections, ...derived) => {
	if(new.target == Inject)
	{
		throw new Error(`Cannot access injectable subclass!

Are you trying to instantiate like this?

new Inject(baseClass, injections);

If so please try:

new (Inject(baseClass, injections));

Please note the parenthesis.
`);
	}

	const existingInjections = baseClass[injectionSymbol]
		? baseClass[injectionSymbol]()
		: {};

	const staticInjections = Object.assign(
		{}
		, existingInjections
		, injections
	);

	let derivedInjections = Object.assign({}, staticInjections);

	for(const iteration of derived)
	{
		Object.assign(derivedInjections, iteration(derivedInjections));
	}

	const allInjections = Object.assign(
		{}
		, existingInjections
		, staticInjections
		, derivedInjections
	);

	const subclass = class extends baseClass {
		constructor(...args)
		{
			super(...args);

			for(let name in allInjections)
			{
				let instance  = undefined;
				let injection = allInjections[name];

				if(injection === undefined)
				{
					if(!this.constructor[parentInjector])
					{
						throw new Error(
							`Cannot accept undefined for ${name} on top-level injection.`
						);
					}

					let parent = this.constructor[parentInjector];

					while(parent)
					{
						if(parent[name])
						{
							injection = parent[name];

							break;
						}

						parent = parent[parentInjector];
					}

					if(injection === undefined)
					{
						throw new Error(
							`Injection ${name} not found in hierarchy.`
						);
					}
				}

				if(injection.prototype && !name.match(/^_*?[A-Z]/))
				{
					injection[parentInjector] = this;

					instance = new injection;
				}
				else
				{
					instance = injection;
				}

				if(!this[name])
				{
					Object.defineProperty(this, name, {
						enumerable: false,
						writable:   true,
						value:      instance
					});
				}
				else
				{
					this[name] = instance;
				}
			}			
		}

		static [injectionSymbol]()
		{
			return allInjections;
		}
	};

	Object.assign(subclass, allInjections);

	return subclass;
};

export { Inject };
