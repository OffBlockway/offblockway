import json
data = json.load(open('data.json'))

hashes = []
#increment over the json data and add it to array
for j in range( len(data["chains"]) ):
    hashes.append( data["chains"][j]["hash"] )

#array of hashes
#hashes = ["hello", "nice", "cool", "hello", "wow", "nice", "hello"]

#dictionary where hashes will be the key and freq will be value
hash_freq = {}

max_freq = 0
max_hash = ""

for i in range(len(hashes)):
    if hashes[i] in hash_freq:
        hash_freq[hashes[i]] = hash_freq[hashes[i]] + 1
    else:
        hash_freq[hashes[i]] = 1

    if hash_freq[hashes[i]] > max_freq:
        max_freq = hash_freq[hashes[i]]
        max_hash = hashes[i] 


print( max_hash )
        
    
