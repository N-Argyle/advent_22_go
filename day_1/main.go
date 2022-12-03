package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
)

var file string = "input1.txt"

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type FileScanner struct {
	io.Closer
	*bufio.Scanner
}

func createScanner(file string) *FileScanner {
	readFile, err := os.Open(file)
	check(err)
	fileScanner := bufio.NewScanner(readFile)
	fileScanner.Split(bufio.ScanLines)
	return &FileScanner{readFile, fileScanner}
}

func part2() {
	var fileScanner = createScanner(file)
	var largestValue int = 0
	var secondValue int = 0
	var thirdValue int = 0
	var currentValue int = 0

	for fileScanner.Scan() {
		if fileScanner.Text() == "" {
			if currentValue > largestValue {
				thirdValue = secondValue
				secondValue = largestValue
				largestValue = currentValue
			} else if currentValue > secondValue {
				thirdValue = secondValue
				secondValue = currentValue
			} else if currentValue > thirdValue {
				thirdValue = currentValue
			}
			currentValue = 0
		} else {
			val, err := strconv.Atoi(fileScanner.Text())
			check(err)
			currentValue += val
		}
	}

	fmt.Println(largestValue + secondValue + thirdValue)
	fileScanner.Close()
}

func main() {
	part2()
}
