## Instructions
# The tree config sent as a JSON request to the back-end needs to contain the following properties:
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
	branchWidth: 1,
	iterations: 6,
	axiom: ['A'],
	useLengthAsWidth: true,
	rules: {
		global: {
		},
		0: {
			'A': 'FA'
		},
		1: {
			'A': 'FA'
		},
		2: {
			'A': '[&FLA]/////[&FLA]///////[&FLA]'
		},
		3: {
			'A': '[&FLA]/////[&FLA]///////[&FLA]'
		},
		4: {
			'A': '[&[FL===L]]/////[&[FL===L]]///////[&[FL===L]]'
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

* + - rotate positively around the z-axis
* - - rotate negatively around the z-axis
* & - rotate positively around the x-axis 
* ^ - rotate negatively around the x-axis
* = - rotate positively around the y-axis (Because \ is used as a formatting character)
* / - rotate negatively around the y-axis

* | - rotate 180° around the z-axis

* ` - leaf declaration (Vertices will be sent in the leaf section of the output, as opposed to the default branches)

* 1 - Sets segment length to 100%
* 2 - Sets segment length to 60%
* 3 - Sets segment length to 40%
* 4 - Sets segment length to 20%

# Alternatively, the flag ``useLengthAsWidth`` can be given.

| Width | Length |
|-------|--------|
| 100%  | 100%   |
| 50%   | 60%    |
| 10%   | 40%    |
| 5%    | 20%    |

* 5 - Unused

# This section is currently not implemented
* 6 - sets branch width to 100%
* 7 - sets branch width to 50%
* 8 - sets branch width to 10%
* 9 - sets branch width to 5%