# cv3-inject

Simple dependency injection for ES6

[![cv3-inject](https://img.shields.io/badge/cv3-inject-darkred?style=for-the-badge)](https://www.npmjs.com/package/cv3-inject) [![Version Badge](https://img.shields.io/npm/v/cv3-inject?label=ver&style=for-the-badge)](https://www.npmjs.com/package/cv3-inject) [![Travis (.org)](https://img.shields.io/travis/seanmorris/cv3-inject?style=for-the-badge)](https://travis-ci.org/seanmorris/cv3-inject) ![[Downloads Badge](https://img.shields.io/npm/dm/cv3-inject?color=338800&style=for-the-badge)](https://www.npmjs.com/package/cv3-inject) [![Size badge](https://img.shields.io/github/languages/code-size/seanmorris/cv3-inject?style=for-the-badge)](https://github.com/seanmorris/cv3-inject) [![Apache-2.0 Licence Badge](https://raw.githubusercontent.com/seanmorris/cv3-inject/master/LICENSE)](https://github.com/seanmorris/cv3-inject/blob/master/LICENSE)


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
import { XmasTree } from './XmasTree';
import { RedStar  } from './RedStar';

const redTree = new (Inject(XmasTree, {star: RedStar} ));
```

The dynamically created class will still register as an instance of the base class:

```javascript
console.assert(redTree instanceof XmasTree);
```

### Pre-instantiated Dependencies

Dependencies may be instantiated before the main object. In the below example, both the `sameTree.star` object and `sameTree.lights.star` will hold a reference to the same instance of `RedStar`.

```javascript
import { RedStar  } from './RedStar';
import { Lights   } from './Lights';
import { XmasTree } from './XmasTree';

const rs = new RedStar;

const sameTree = new (Inject(XmasTree, {
	lights: Inject(Lights, {star: rs})
	, star: rs
}));
```

## License 

cv3-inject &copy; Sean Morris 2019

All code in this package is relased under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) licence.
