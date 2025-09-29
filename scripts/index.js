'use strict'; // For modern JavaScript support and strict mode

/*
Maximal value for integer number in JavaScript that can be store is 2**53 - 1
or equal to 9007199254740991, therefore any operation that greather than that value
will not percise and also can't store odd value */
console.log(9007199254740991 + 1);
console.log(9007199254740991 + 2);
console.log(9007199254740991 + 3);
console.log(9007199254740991 + 4);
console.log(9007199254740991 + 9);
console.log(9007199254740991 + 10);

// BigInt for percise operation more than 2**53 - 1 (9007199254740991)
console.log(9007199254740991n + 2n);
console.log(9007199254740991n + 4n);
console.log(9007199254740991n + 6n);
