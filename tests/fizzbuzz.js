/*
    Requirment:

    Write a program that prints the numbers from 1 to 100 and 
    for multiples of ‘3’ print “Fizz” instead of the number 
    and for the multiples of ‘5’ print “Buzz”. 


*/
fb();

function fb(){

    for (i = 1; i != 101; i++) {
        if (i%15 === 0) console.log(i + "FizzBuzz"); // by 3 and 5  (will always be by 15)
        else if (i%3 === 0) console.log(i + "Fizz"); // by 3
        else if (i%5 === 0) console.log(i + "Buzz"); // by 5
        else console.log(i); 
    }
}

