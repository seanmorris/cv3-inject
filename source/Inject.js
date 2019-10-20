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

	const sortedInjections = Object.assign(
		{}
		, injections
		, allInjections
	);

	const subclass = class extends baseClass {
		constructor(...args)
		{
			super(...args);

			for(let name in sortedInjections)
			{
				let instance  = undefined;
				let injection = sortedInjections[name];

				if(injection === undefined)
				{
					if(!this.constructor[parentInjector])
					{
						// throw new Error(
						// 	`Cannot accept undefined for ${name}`
						// 	+` on top-level injection ${this.constructor.name}.`
						// );
					}

					let parent = this.constructor[parentInjector];

					while(parent)
					{
						if(name in parent)
						{
							injection = parent[name];

							break;
						}

						parent = parent[parentInjector];
					}

					if(injection === undefined)
					{
						// throw new Error(
						// 	`Injection ${name} not found in hierarchy.`
						// );
					}
				}

				if(injection && injection.prototype && !name.match(/^_*?[A-Z]/))
				{
					if(this[name] && this[name].constructor === injection)
					{
						continue;
					}

					injection[parentInjector] = this;

					instance = new injection;

					delete injection[parentInjector];
				}
				else
				{
					instance = injection;
				}

				if(1 || !this[name])
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
			return sortedInjections;
		}
	};

	Object.assign(subclass, sortedInjections);

	return subclass;
};

export { Inject };
