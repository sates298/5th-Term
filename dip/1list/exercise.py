import cv2 as cv
import numpy as np


original = cv.imread('contrast.jpg', 1)

# read img in gray
gray = cv.imread('contrast.jpg', cv.IMREAD_GRAYSCALE)

# s = cr^gamma
gamma = 3
converted = np.power(gray, gamma)

# gaussian filtering
# cv.getGaussianKernel(ksize=3, sigma=10)
blur = cv.GaussianBlur(converted, (7,7), 3)


cv.imshow("original", original)
cv.imshow("grayscale", gray)
cv.imshow("gamma", converted)
cv.imshow("gaussian", blur)

cv.waitKey(100000)

