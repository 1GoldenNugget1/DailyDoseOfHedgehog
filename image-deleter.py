import keyboard

import cv2

from os import listdir
from os.path import isfile, join

font = cv2.FONT_HERSHEY_SIMPLEX
fontScale = 10
fontThicc = 3

files = [f for f in listdir('img/') if isfile(join('img/', f))]

#If list already exists add list of already deleted files
if isfile('deletedImages.txt'):
    with open('deletedImages.txt') as myfile:
        deletedAlready = [line.rstrip() for line in myfile]
        files = [f for f in files if f not in deletedAlready]

i = 1

for file in files:
    image = cv2.imread('img/'+file)
    word = f'{i}/{len(files)}'

    #calc word size for given scale and thickness
    wordSize = cv2.getTextSize(word, font, fontScale, fontThicc)[0]
    wordX = int((image.shape[1] - wordSize[0])/2)
    wordY = int((image.shape[0] + wordSize[1])/2)

    #draw text with border
    cv2.putText(image, word, (wordX, wordY), font, fontScale, (0, 0, 0), fontThicc*4)
    cv2.putText(image, word, (wordX, wordY), font, fontScale, (255, 255, 255), fontThicc)

    cv2.imshow('image', image)
    i += 1
    k = cv2.waitKey()
    #print(k)
    if k==0:
        print(f"Deleted {file}")
        with open("deletedImages.txt", "a") as myfile:
            myfile.write(f"{file}\n")
        continue
    if k==27:
        break