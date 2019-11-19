import cv2 as cv
import numpy as np


original = cv.imread('contrast.jpg', 1)

# read img in gray
gray = cv.imread('contrast.jpg', cv.IMREAD_GRAYSCALE)


def adjust_gamma(image, gamma):
	# build a lookup table mapping the pixel values [0, 255] to
	# their adjusted gamma values
	invGamma = 1.0 / gamma
	table = np.array([((i / 255.0) ** invGamma) * 255
		for i in np.arange(0, 256)]).astype("uint8")
 
	# apply gamma correction using the lookup table
	return cv.LUT(image, table)

# s = cr^gamma
gamma = 3
converted = adjust_gamma(gray, gamma)

# gaussian filtering
blur = cv.GaussianBlur(converted, (5,5), 20)

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


print(max)

cv.imshow("original", original)

cv.imshow("grayscale", gray)
cv.imwrite("grayscale.jpg", gray)

cv.imshow("gamma", converted)
cv.imwrite("gamma_conversion.jpg", converted)

cv.imshow("gaussian", blur)
cv.imwrite("gaussian_filtering.jpg", blur)


cv.waitKey(100000)

