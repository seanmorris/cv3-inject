import { Test   } from 'cv3-test/Test';

import { Inject as I } from './Inject';

class DepA{};
class DepAA extends DepA{};
class DepB{};
class DepZ{};
class DepZZ extends DepZ{};

export class ShuffleTest extends Test
{
	testObjectShuffle()
	{
		class Base extends I(class{}, {
				a: DepA, b: DepB
			}
		){};

		const AbsB  = I(DepB, {a: undefined});

		class Sub extends I(Base, {b: AbsB}){};

		class SubSub extends I(Sub, {
			b: AbsB
			, a: DepA
		}){};

		class SubSubSub extends I(SubSub, {
			z: DepZZ, b: I(AbsB, {z: undefined})
		}){};

		const base = new Base;

		this.assert(
			base.a instanceof DepA
			, 'base.a is not an instance of DepA.'
		);

		this.assert(
			base.b instanceof DepB
			, 'base.a is not an instance of DepA'
		);

		const sub = new Sub;

		this.assert(
			sub.a instanceof DepA
			, 'sub.a is not an instance of DepA.'
		);

		this.assert(
			sub.b instanceof DepB
			, 'sub.b is not an instance of DepB.'
		);

		this.assert(
			sub.b instanceof AbsB
			, 'sub.b is not an instance of AbsB.'
		);

		this.assert(
			sub.b.a instanceof DepA
			, 'sub.b.a is not an instance of DepA.'
		);

		this.assert(
			sub.a === sub.b.a
			, 'sub.a is not the same instance sub.b.a.'
		);

		const subSub = new SubSub;

		this.assert(
			subSub.a instanceof DepA
			, 'subSub.a is not an instance of DepA.'
		);

		this.assert(
			subSub.b instanceof DepB
			, 'subSub.b is not an instance of DepB.'
		);

		this.assert(
			subSub.b instanceof AbsB
			, 'subSub.b is not an instance of AbsB.'
		);

		this.assert(
			subSub.b.a instanceof DepA
			, 'subSub.b.a is not an instance of DepA.'
		);

		this.assert(
			subSub.a === subSub.b.a
			, 'subSub.a is not the same instance subSub.b.a.'
		);

		const subSubSub = new SubSubSub;

		this.assert(
			subSubSub.a instanceof DepA
			, 'subSubSub.a is not an instance of DepA.'
		);

		this.assert(
			subSubSub.b instanceof DepB
			, 'subSubSub.b is not an instance of DepB.'
		);

		this.assert(
			subSubSub.b instanceof AbsB
			, 'subSubSub.b is not an instance of AbsB.'
		);

		this.assert(
			subSubSub.b.a instanceof DepA
			, 'subSubSub.b.a is not an instance of DepA.'
		);

		this.assert(
			subSubSub.a === subSubSub.b.a
			, 'subSubSub.a is not the same instance subSubSub.b.a.'
		);

		this.assert(
			subSubSub.z instanceof DepZ
			, 'subSubSub.z is not an instance of DepZ.'
		);

		this.assert(
			subSubSub.b.z instanceof DepZ
			, 'subSubSub.b.z is not an instance of DepZ.'
		);

		this.assert(
			subSubSub.z === subSubSub.b.z
			, 'subSubSub.z is not the same instance as subSubSub.b.z.'
		);
	}

	testMethodShuffle()
	{
		class ReMethodable extends I(class{}, {
			MethodA: () => {
				return 'Normal.';
			}
		}){
			callInjection()
			{
				return this.MethodA();
			}
		};

		const reMeth = new ReMethodable;

		this.assert(
			reMeth.callInjection() === 'Normal.'
			, 'Remethodable.callInjection returned unexpected value for normal.'
		);

		class ReMethodable2 extends I(ReMethodable, {
				MethodB: () => {
					return 'Injected.'
				}
			}
			, ({MethodB})=>({
				MethodA: ()=>{
					return MethodB();
				}
			})
		){};

		const reMeth2 = new ReMethodable2;

		this.assert(
			reMeth2.callInjection() === 'Injected.'
			, 'Remethodable2.callInjection returned unexpected value for normal.'
		);
	}
}
