# cv3-inject

Simple dependency injection for ES6

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
	constructor()
	{
		super();
	}

	blink()
	{
		this.star.blink();
		this.lights.blink();
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
