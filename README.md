# js-cli

run javascript on stdin line by line

## Usage


`--file <filename>`

javascript file to be used as the command.  The file should define a single function which can accept a single input string, the line being processed.

`--command <string>`

the command to be run.  The command will be executed as the function body of a function accepting one argument, named `line`.  
(this is the default option for any value that isn't attached to an option.  `js-cli abc xyz` would result in `command` being `abc xyz`)

`--debug`

debug what the program is doing. (setting `DEBUG_JSCLI` environment variable will also work)

**return**

Any value returned from the function will be spit out on the console again.  In this way, you can filter input or alter it.  Returning `undefined` will result no console logs for the corresponding line.

## Example

I'd like to get the apt-get moo on my screen, but don't want that pesky message

```
λ ~/ apt-get moo | js-cli 'return /^\s/.test(line) ? line : undefined'
                 (__)
                 (oo)
           /------\/
          / |    ||   
         *  /\---/\
            ~~   ~~   
```

A more likely example would be to alter the line

`file1.txt`
```
folderA/test1.svg
folderB/test2.png
folderC/test3.png
folderD/test4.gif
```

Print out extension-less file names
```
λ ~/ js-cli "
let parts = line.split(/[\/\.]/);
if (parts.length === 3) {
  return parts[1];
}" < file1.txt
```

#### NOTE
I'm sure there are other ways to do what this module can do. But I live in JS most of the day and I find switching to the command line for simple things to be draining.  I wrote this so I could stay in JS land and yet accomplish simple command line tasks if needed.
