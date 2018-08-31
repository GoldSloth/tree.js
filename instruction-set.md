## Instructions
#### The tree config sent as a JSON request to the back-end needs to contain the following properties:
* angle - the degrees of rotation around an axis
* forwardMovement - the length of each branch segment
* iterations - the number of times the algorithm with run (complexity)
* axiom - the starting string for the algorithm, must contain letters in the alphabet
* rules - an instruction set for each iteration of the algorithm, must contain mappings only containing letters in the alphabet
*

## Example JSON request for a tree:
```javascript
{
	angle: {x: 22.5, y: 22.5, z: 22.5},
	forwardMovement: 15,
	branchWidth: 2,
	iterations: 7,
	axiom: ['A'],
	useLengthAsWidth: false,
	lengths: [
		1,
		0.8,
		0.6,
		0.4
	],
	widths: [
		1,
		0.5,
		0.1,
		0.05
	],
	rules: {
		global: {
		},
		0: {
			'A': '1FA'
		},
		1: {
			'A': '1FA'
		},
		2: {
			'A': '[2&FLA]/////[2&FLA]///////[2&FLA]'
		},
		3: {
			'A': '[2&FLA]/////[2&FAFLA]///////[2&FLA]'
		},
		4: {
			'A': '[&3FA]/////[&3FAFA]///////[&3FA]'
		},
		5: {
			'A': '[&[4F^L===&3L]]/////[&[4FL===L]]///////[&[4FL===L]]'
		},
		final: {
			'L': '[/`[-f+f+f-|-f+f+f]/[-f+f+f-|-f+f+f]/[-f+f+f-|-f+f+f]/[-f+f+f-|-f+f+f]]`'
		}
	}
}
```

Global rules can be applied at any time that a specific iteration rule is not found.
Iteration specific rules will always have a higher priority than global rules.
Final rules will have higher precedence than anything else.

## The L-system alphabet consists of:
* F - forward movement
* f - forward movement of a 'mini' step (1/10th of a full step) this is usually for leaves.


* [ - open branch
* ] - close branch

(Fitting with the paper: [Algorthmic Botany](http://algorithmicbotany.org/papers/abop/abop.pdf))

* \+ - rotate positively around the z-axis
* \- - rotate negatively around the z-axis
* & - rotate positively around the x-axis 
* ^- rotate negatively around the x-axis
* = - rotate positively around the y-axis (Because \ is used as a formatting character)
* / - rotate negatively around the y-axis

* | - rotate 180° around the z-axis

* ` - leaf declaration (Vertices will be sent in the leaf section of the output, as opposed to the default branches)

* < - Forward progression in tree (Length shorter, Width narrower)
* > - Backwards progression in tree (Length longer, Width wider)

#### Important: You must have as many progressions defined as iterations, Otherwise weird things happen

| Progression | Width | Length |
|-------------|-------|--------|
| 0           | 100%  | 100%   |
| 1           | 50%   | 60%    |
| 2           | 10%   | 40%    |
| 3           | 5%    | 20%    |

(These are fairly standard values, others can be provided in the argument list)