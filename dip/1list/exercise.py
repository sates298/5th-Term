import cv2 as cv
import numpy as np


original = cv.imread('contrast.jpg', 1)

# read img in gray
gray = cv.imread('contrast.jpg', cv.IMREAD_GRAYSCALE)

# s = cr^gamma
gamma = 3
converted = np.power(gray, gamma)

# gaussian filtering
blur = cv.GaussianBlur(converted, (19,19), 6)

# check neighbour pixels
max = 0
curr = 0
width = len(blur)
height = len(blur[0])
for i in range(width):
    for j in range(height):
        if i-1 >=0:
            if j-1 >=0:
                curr = abs(1 - (blur[i-1][j-1] / blur[i][j]))
                if curr > max:
                    max = curr
            if j+1 < height:
                curr = abs(1 - (blur[i-1][j+1] / blur[i][j]))
                if curr > max:
                    max = curr
            curr = abs(1 - (blur[i-1][j] / blur[i][j]))
            if curr > max:
                max = curr
        if i+1 < width:
            if j-1 >=0:
                curr = abs(1 - (blur[i+1][j-1] / blur[i][j]))
                if curr > max:
                    max = curr
            if j+1 < height:
                curr = abs(1 - (blur[i+1][j+1] / blur[i][j]))
                if curr > max:
                    max = curr
            curr = abs(1 - (blur[i+1][j] / blur[i][j]))
            if curr > max:
                max = curr
        if j-1 >=0:
            curr = abs(1 - (blur[i][j-1] / blur[i][j]))
            if curr > max:
                max = curr
        if j+1 < height:
            curr = abs(1 - (blur[i][j+1] / blur[i][j]))
            if curr > max:
                max = curr


# print(max)
cv.imshow("original", original)

cv.imshow("grayscale", gray)
cv.imwrite("grayscale.jpg", gray)

cv.imshow("gamma", converted)
cv.imwrite("gamma_conversion.jpg", converted)

cv.imshow("gaussian", blur)
cv.imwrite("gaussian_filtering.jpg", blur)

cv.waitKey(100000)

