## Instructions
#### The tree config sent as a JSON request to the back-end needs to contain the following properties:
* angle - The angle to rotate around the specified axis
* leafAngle - See above, but for leaves
* forwardMovement - The base length of a branch section
* leafLength - See above, but for leaves
* branchWidth - Base values for branch width
* iterations - How many times will the replacement algorithm run
* axiom - The starting string for the algorithm

* lengths - An array defining a multiplier for the branch length for each progression along a tree
* widths - An array defining a multiplier for the branch width for each progression along a tree

* rules - See table below:

| Rule Type |         Executed When         | Precedence |       Typical Usage      |
|:---------:|:-----------------------------:|:----------:|:------------------------:|
|   final   |     On the final iteration    |      1     |          Leaves          |
|    [i]    |   On the specified iteration  |      2     | The first few iterations |
|   global  | When other rules do not apply |      3     |       General rules      |

All rules follow the format "Letter" => "Transformed set of letters"

* stochasticSymbols - An object featuring used symbols, and their stochastic meaning.

## Example JSON request for a tree:
```javascript
{
	angle: {x: 30, y: 90, z: 30},
	leafAngle: {x: 22.5, y: 22.5, z: 22.5},
	forwardMovement: 15,
	leafLength: 0.25,
	branchWidth: 6,
	iterations: 4,
	axiom: ['X'],
	rules: {
		global: {
			'X': '[F[=+<X>][=-<X>]]=[F[=+<X>][=-<X>]]F<X>',
			'F': 'FF'
		},
		1: {
			'F': "FXF"
		}
		final: {
			'X': '[/`[-f+f+f-|-f+f+f]`]'
		}
	},
	lengths: [
		1,
		0.9,
		0.8,
		0.7,
		0.6,
		0.5,
		0.4,
		0.3
	],
	widths: [
		1,
		0.4,
		0.2,
		0.1,
		0.05,
		0.025,
		0.0125,
		0.006,
		0.003,
		0.0015
	],
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

* ( - open stochastic group
* ) - close stochastic group

* { - open stochastic branch
* } - close stochastic branch

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


#### Stochastic Rules:

A stochastic group can be defined between normal brackets ``()``, indicating that a "choice" needs to be made.

A stochastic branch should be defined inside a stochastic group using curly brackets ``{}``, declaring the different "choices" that can be made.

Pre-defined stochastic symbols should be used to indicate the relative frequency of an event.

For instance, if the following symbols were defined:

| Symbol | Value |
|--------|-------|
| a      | 0.2   |
| b      | 0.5   |
| c      | 0.8   |

This statement could be made:

``(a{[F+F]}c{[F-F]})``

Broken down, that interprets as:

* Open new stochastic group

* If rnd < 0.2, do [F+F]
* If  0.2 < rnd < (0.2 + 0.8), do [F-F]

* Close stochastic group
