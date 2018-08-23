## Instructions
*The tree config sent as a JSON request to the back-end needs to contain the following properties:
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
	iterations: 5, 	
	axiom: ['A'], 
	rules: {
		global: {
			'L': '[/`[-f+f+f-|-f+f+f]/[-f+f+f-|-f+f+f]/[-f+f+f-|-f+f+f]/[-f+f+f-|-f+f+f]]`'
		},
		0: {
			'A': 'FFG'
		},
		1: {
			'G': '[&FLA]/////[&FLA]///////[&FLA]'
		},
		2: {
			'F': 'S/////F'
		},
		3: {
			'S': 'FL'
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
* f - forward movement of a 'mini' step (1/10th of a full step)


* [ - open branch
* ] - close branch

(Fitting with the paper: [Algorthmic Botany](http://algorithmicbotany.org/papers/abop/abop.pdf))

* + - rotate positively around the z-axis
* - - rotate negatively around the z-axis
* & - rotate positively around the x-axis 
* ^ - rotate negatively around the x-axis
* \ - rotate positively around the y-axis 
* / - rotate negatively around the y-axis

* | - rotate 180° around the z-axis

* ` - leaf declaration (Vertices will be sent in the leaf section of the output, as opposed to the default branches)
