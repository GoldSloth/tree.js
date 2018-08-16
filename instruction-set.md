## Instructions
*For this algorithm you need to define three things:*

1. An axiom (A string that determines n0)
2. A set of rules for each iteration. Example:
	* A -> B
	* B -> AB
3. ***Optional*** Probability of angle change for "randomising" plant growth

### Instruction set

An instruction set consists of an array of instructions, for instance:
```
F [X F Y]
```

* X rotateX +
* A rotateX -

* Y rotateY +
* B rotateY -

* Z rotateZ +
* C rotateZ -

* F Forward

* [ Start branch
* ] Close branch
