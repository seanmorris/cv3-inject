const injectionSymbol = Symbol('injection');
const derivedSymbol   = Symbol('derived');
// const instanceSymbol  = Symbol('instance');

const getParentInjection  = Symbol('getParentInjection');
const parentInjector      = Symbol('parent');

const Inject = (baseClass, injections, ...derived) => {
	if(new.target == Inject)
	{
		throw new Error(`Cannot access injectable subclass!\n
			Are you trying to instantiate like this?\n
			new Inject(baseClass, injections);\n
			If so please try:\n
			new (Inject(baseClass, injections));\n
			Please note the parenthesis.\n`.replace(/\n[\t ]+/g, "\n")
		);
	}

	const existingInjections = baseClass[injectionSymbol]
		? baseClass[injectionSymbol]()
		: {};

	const staticInjections = Object.assign(
		{}
		, existingInjections
		, injections
	);

	const allInjections = Object.assign(
		{}
		, injections
		, existingInjections
		, staticInjections
		, injections
		// , derivedInjections
	);

	const subclass = class extends baseClass {
		constructor(...args)
		{
			super(...args);

			let derivedInjections = Object.assign({}, allInjections);

			let parent = this.constructor;

			for(const iteration of derived)
			{
				Object.assign(derivedInjections, iteration(derivedInjections));
			}

			while(parent)
			{
				if(!parent[derivedSymbol])
				{
					parent = Object.getPrototypeOf(parent);
					continue;
				}

				let derived = parent[derivedSymbol](derivedInjections);

				for(const iteration of derived)
				{
					Object.assign(derivedInjections, iteration(derivedInjections));
				}

				parent = Object.getPrototypeOf(parent);
			}

			for(let name in derivedInjections)
			{
				let instance  = undefined;
				let injection = derivedInjections[name];

				if(injection === undefined)
				{
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

		static [derivedSymbol]()
		{
			return derived;
		}
	};

	Object.assign(subclass, allInjections);

	return subclass;
};

export { Inject };
