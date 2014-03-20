hsCTFSite
=====

About
-----
hsCTF is the first CTF run by high school students. It's for students who are in high school and love CS, or are curious about it. This is the website for hsCTF.

Starting it Up
----------------------------------
On a Unix-based system such as Linux, BSD, Solaris, or OSX, cd to the inside of this directory:

```shell
cd path/to/hsCTFSite
```
Or for Windows, in Command Prompt:
```shell
cd path\to\hsCTFSite
```

Then run the following:
```shell
node app.js
```

(of course, you must have node.js installed first)
You may then get the list of emails by submitting your password as an email. The password is encoded as the password hashed with sha512 in app.js, you can set it your own value so you can use it.
