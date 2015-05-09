#Slashey

##Problem
Keith the Knight doesn't like slashing because he feels it is too violent. Because he's in the city of Slashville, he needs to protect himself.
Help Keith protect himself by finding the flag in this [file](hsctf.com/ciJsbu4VFk/slashey.o)

##Solution

We can disassemble this in IDA.

The first thing we see in the main method is [this](https://dl.dropboxusercontent.com/u/60294520/SlasheyKeyLetters.PNG). We can see that there are a variety of characters that are put in each element of the *key* array. Specifically, we can see the string "t42[jkp[hks[harah[ajkqcd" put into the array.

The body of the main method is [this](https://dl.dropboxusercontent.com/u/60294520/SlasheyMainBody.PNG). We can see that scanf is called, and changeUp is called immediately after. *scanf* is a function in the C standard library that reads in a string through standard input. *changeUp* is a function defined elsewhere in the file. It's dissassembly is [this](https://dl.dropboxusercontent.com/u/60294520/changeUp.PNG). 

Where does *scanf* store the string it accepts? We see that line is moved onto the program stack prior to the *scanf* call from the line 
"mov dword ptr[esp + 4], offset _line". This means that *scanf* stores the string it finds into the array *line*. 

We can get a general idea of what *changeUp* does by analyzing the assembly. First, *eax* is set to 0. Then, the value at *line[eax]* (in this case, *line[0]*) is subtracted by 4. *eax* is then incremented and compared to 18h. If it does not equal 18h, the program will loop back to the line that subtracts from an element in *line*. The basic idea is, thus, that the first 24 elements in *line* are subtracted by 4, so the first 24 elements in the inputted string are subtracted by 4. Why'd I say 24 and not 18? I said 18h, which is 18 in hexadecimal (base 16). The equivalent in base 10 is 24.

Going back to the main method, we see that the function *strcmp* is called. This is a library method that compares two strings. What two strings are we comparing? From the previous two lines, we see that it's comparing the string in *key* and the string in *line*. If the strcmp returns 0 (in other words, if the strings match each other) then the stirng "Woohoo, you got it" is printed. 

So, we've figured out that the program does the following:

1. Accept a string as input.
2. Subtract the hex number of the first 24 characters in this string by 4.
3. Compare the new string with "t42[jkp[hks[harah[ajkqcd".
4. If they match, print "Woohoo, you got it."
5. If not, print "Nope."

So, adding 4 to each character in "t42[jkp[hks[harah[ajkqcd" gives us the key **x86_not_low_level_enough**
