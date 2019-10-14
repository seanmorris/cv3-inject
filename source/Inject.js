const injectionSymbol = Symbol('injection')
const instanceSymbol  = Symbol('instance');

const Inject = (baseClass, injections, derived) => {
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

	const derivedInjections = derived
		? derived(staticInjections)
		: {};

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
				let   instance  = undefined;
				const injection = allInjections[name];

				if(injection.prototype && !name.match(/^_*?[A-Z]/))
				{
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
