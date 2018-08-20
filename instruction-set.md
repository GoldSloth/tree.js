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
	angle:25, 
	forwardMovement: 1, 
	iterations: 6, 	
	axiom: ['X'], 
	rules: {
		'X':'F+[zt[X]uz-X]-F[-FX]uc+Xt',
		'F':'FF'
	}
}
```

## The L-system alphabet consists of:
* F - forward movement

* [ - open branch
* ] - close branch

* Z / + - rotate positively around the z-axis
* z / - - rotate negatively around the z-axis
* X - rotate positively around the x-axis 
* x - rotate negatively around the x-axis
* Y - rotate positively around the y-axis 
* y - rotate negatively around the y-axis
