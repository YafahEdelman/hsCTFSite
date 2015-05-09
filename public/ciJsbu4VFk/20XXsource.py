# Version: Python 3 
  
from random import randint 
  
def is_probable_prime(n): 
    # Miller-Rabin primality test, iterated thousands of times.
    ***REDACTED***
  
def PrivateKeys(length, start): 
    # generates an easy knapsack, a modulus q, and random multiplier r. 
    sums = start 
    privateKey = [] 
    privateKey.append(start) 
    for i in range(length-1): 
        new = sums+randint(1,10) 
        sums+= new 
        privateKey.append(new) 
    q = 0
    for i in range(sums, 2*sums): 
        if (is_probable_prime(i)): 
            q = i 
            break
    r = randint(1,q) 
    PrivateKeys = [privateKey, q, r] 
    return PrivateKeys 
  
def PublicKey(PrivateKeys): 
    # multiplies the easy knapsack mod q by chosen r 
    privateKey = PrivateKeys[0] 
    q = PrivateKeys[1] 
    r = PrivateKeys[2] 
    return [(r*i)%q for i in privateKey] 
  
def Encrypt(publicKey, message): 
    # encodes the message into ascii, then uses the bits to create a knapsack problem. 
    ASCII = bin(int.from_bytes(message.encode(), 'big'))[2:] #first bit is dropped unfortunately
    ciphertext = 0
    for i in range(len(ASCII)): 
        ciphertext+= int(ASCII[i])*publicKey[i] 
    return ciphertext 
  
if __name__ == "__main__": 
    privateKeys = PrivateKeys(***REDACTED***, ***REDACTED***) 
    publicKey = PublicKey(privateKeys) 
    print(publicKey) 
    ciphertext = Encrypt(publicKey,flag) 
    print(ciphertext) 