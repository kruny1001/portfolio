Chapter1
1. Expressions
  m1. Type anything at the prompt, and R will evaluate it and print the answer.
  > 1+ 1
  [1] 2
  There's your result, 2. It's printed on the console right after your entry.
  
  m2. Type the string "Go Jacks!". (Don't forget the quotes!)
  > "Go Jacks"
  [1] "Go Jacks"
  
  m3(challenge). Challenge: Now try multiplying 45.6 times 78.9
  
  
2. Logical Values
  m1. Some expressions return a "logical value": true or false. (Many programming languages refer the these as "boolean" values.)
  Let's try typing an expression that gives us logical value:
  > 3 < 4
  [1] TRUE
  
  m2. Another logical value (note that you need a double-equals to check whether two values are equal - a single-equals sign won't work):
  > 2 + 2 === 5
  [1] FALSE
  
  m3. T and F are shorthand for TRUE and FALSE. Try this:
  > T == TRUE
  [1] TRUE

3. Variables
  m1. As in other programming languages, you can store values into a variable to access it later. Type x = 42 to store a value in x
  > x = 42
  [1] 42
  You can also use the following. This is a safer way to assign values. 
  > x <- 42
  
  m2. x can now be used in expressions in place of the original result. Try dividing x by 2 (/ is the division operator)
  > x / 2
  [1] 21
  
  m3. You can re-assign any value to a variable at any time. Try assigning "Arr, matey!" to x
  > x = "Go Jacks!"
  
  m4. You can print the value of a variable at any time just by typing its name in the console. Try print the current value of x
  > x
  [1] "Go, Jacks!"
  
  m5. Now try assigning the TRUE logical value to x
  > x = TRUE
  
  
4. Functions
  m1. You call a function by typing its name, followed by one or more arguments to that function in parenthesis. Let's try using the sum 
  function, to add up a few numbers. 
  > sum(1,3,5)
  [1] 9
  
  m2. Some arguments have names. For example, to repeat a value 3 times, you would call the rep function and provide its times argument
  > rep("Yo ho!", times=3)
  [1] "Yo ho!" "Yo ho!" "Yo ho!"
  
  m3. Challenge: Find the R function through Google to compute the square root of 57007 try search using "R square root" 
  
  m4. example() brings up examples of usage for the given function. Try displaying examples for the min function: 
  > example(min) 
  min> min(5:1, pi) #-> one number
  [1] 1
  
  m5. Now try bringup help for the rep function
  
  m6. I found a log of help information about R through Google. Google tolerate typos, grammar errors, and different notations. Also, most (99.99%)
  of the questions have been asked and answered. Many R gurus answered a ton of questions on web sites like stackoverflow.com. Many example codes! I also
  use Google as a reference. 
  
  m7. Challenge: try to find and run the function that returns the current working directory.
  
  m8. Challenge: Try to find and run the function that lists all the files in the current working folder.
   
  m9. It is important to add comments to your code. Everything after the "#" will be ignored by R when running. 
  > max(1,4,5) #return the maximum value of a vector

Chapter2
1. Vectors
  m1. A vector's values can be numbers, strings, logical values, or any other type as long as they're all the same type.
  Try creating a vector of numbers, like this: 
  > c(4,7,9)
  [1] 4 7 9
  
  The c function (c is short for Combine) creates a new vector by combining a list of values. 
  
  m2. Now try creating a vector with strings: 
  > c('a', 'b', 'c')
  [1] "a" "b" "c"
  
  m3. Vectors cannot hold values with differnet modes (types). Try mixing modes and see what happens: 
  > c (1, TRUE, "three") 
  [1] "1" "TRUE" "three"
  
  All the values were converted to a single mode (characters) so that the vector can hold them all. 
  
2. Sequence Vectors
  m1. If you need a vector with a sequence of numbers you can create it with start:end notation. Let's 
  make a vector with values from 5 through 9: 
  > 5:9
  [1] 5 6 7 8 9
  
  m2. A more versatile way to make sequences is to call the seq functions. Let's do the same thing with seq: 
  > seq(5,9) 
  [1] 5 6 7 8 9
  
  m3. seq also allows you to use increments other than 1. Try it with steps of 0.5
  > seq(5, 9, .5) 
  [1] 5.0 5.5 6.0 6.5 7.0 7.5 8.0 8.5 9.0
  
  m4. Now try making a vector with integers from 9 down to 5: 
  
3. Vector Access
  m1. 
4. Vector Names
5. Vector Math
6. Scatter Plots
7, NA Values and missing data
