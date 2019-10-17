![avatar](https://avatars3.githubusercontent.com/u/640101?s=80&v=4)

# cv3-inject

Simple dependency injection for ES6

[![cv3-inject](https://img.shields.io/badge/cv3-inject-darkred?style=for-the-badge)](https://www.npmjs.com/package/cv3-inject) [![Version Badge](https://img.shields.io/npm/v/cv3-inject?label=ver&style=for-the-badge)](https://www.npmjs.com/package/cv3-inject) [![Travis (.org)](https://img.shields.io/travis/seanmorris/cv3-inject?style=for-the-badge)](https://travis-ci.org/seanmorris/cv3-inject) [![Downloads Badge](https://img.shields.io/npm/dm/cv3-inject?color=338800&style=for-the-badge)](https://www.npmjs.com/package/cv3-inject) [![Size badge](https://img.shields.io/github/languages/code-size/seanmorris/cv3-inject?style=for-the-badge)](https://github.com/seanmorris/cv3-inject) [![Apache-2.0 Licence Badge](https://img.shields.io/npm/l/cv3-inject?color=338800&style=for-the-badge)](https://github.com/seanmorris/cv3-inject/blob/master/LICENSE)


## Install

```bash
$ npm install cv3-inject
```

## Usage

Define default dependencies with Inject:

```javascript
import { Inject } from 'cv3-inject/Inject';

import { Star   } from './Star';
import { Lights } from './Lights';

export class XmasTree extends Inject(class{}, {
	lights: Lights, star:Star
}) {
	blink()
	{
		this.star.blink();
		this.lights.blink();
	}
}
```

### Static Dependencies

Keys starting with a capital letter will not be instantiated, and instead, a reference to the class will be passed in.

*(Please note this example uses [object literal shorthand syntax](https://eslint.org/docs/rules/object-shorthand))*

```javascript
import { Inject } from './Inject';

import { Drink  } from './Drink';
import { Snack  } from './Snack';

export class VendingMachine extends Inject(class{}, {Drink, Snack}) {
	getDrink()
	{
		return new this.Drink;
	}

	getSnack()
	{
		return new this.Snack;
	}
}

```

### Overriding Dependencies

You can inject dependencies in-place, before instantiation. This essentially creates a new subclass on the fly. Please be mindful of the parentheses placement.

```javascript
const redTree = new (Inject(XmasTree, {star: RedStar} ));
```

The dynamically created class will still register as an instance of the base class:

```javascript
console.assert(redTree instanceof XmasTree);
```

### Hierarchical Dependencies
```javascript
const sameTree = new (Inject(XmasTree, {
	star:     RedStar
	, lights: Inject(Lights, {star: undefined})
}));
```

Explcitily setting an injection to `undefined` will cause the injector to check the parent injector for the same key, and if not, its parent, and so on.

Top level injections will throw an error if an injection is `undefined`.

In this example, every new instance of the injected `XmasTree` will hold a reference to rhe same `RedStar` at `instance.star` and `instance.lights.star`.

**Note** Child injections can only access parent injections that preceed it in the precedence order in the **base definition**. In the above example, `.star` could not be modified to hold a reference to `.lights`, even if a subclass injection contained a different ordering. Please keep this in mind while designing dependence hierarchies.

### Cascading Dependencies

```javascript
import { Inject as I } from 'cv3-inject/Inject';
// ... more imports

export class VendingMachineTest extends (Test
	, {vendingMachine:  VendingMachine}

	, ({vendingMachine: VendingMachine}) => ({
		sodaMachine:      I(VendingMachine, {Drink:Soda})
		, waterMachine:   I(VendingMachine, {Drink:BottleOfWater})
		, chipMachine:    I(VendingMachine, {Snack:BagOfChips})
		, pretzelMachine: I(VendingMachine, {Snack:BagOfPretzels})
	})

	, ({pretzelMachine: PretzelMachine}) => ({
		pretzelAndSodaMachine: I(PretzelMachine, {Drink:Soda})
	})

){...}
```
*Note that the Inject() function has been aliased to I().*

In this example, the normal dependency list specifies a dependency that will resolve to an instance of `VendingMachine`, available on the `.vendingMachine` property of the instance. `.sodaMachine`, `.waterMachine` and so on will then use `VendingMachine` as their base class.

This allows us to later inject different `VendingMachine` subclasses (which may have different behaviors) into the `VendingMachineTest`.

Multiple dependency cascades can be can be defined to accommodate any level of complextiy. Each one will contribute to, and read from the same pool of dependencies.

Please note the double bubble notation on the arrow function: `({ })=>({ })`. This allows us to 1: Destructure our static dependency list into variables, and 2: directly return an object via shorthand, i.e. without an explict `return`.

## License 

cv3-inject &copy; Sean Morris 2019

All code in this package is relased under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) licence.
