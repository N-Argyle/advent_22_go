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

func part1() {
	var fileScanner = createScanner()
	var largestValue int = 0
	var currentValue int = 0

	for fileScanner.Scan() {
		if fileScanner.Text() == "" {
			if currentValue > largestValue {
				largestValue = currentValue
			}
			currentValue = 0
			return
		} else {
			val, err := strconv.Atoi(fileScanner.Text())
			check(err)
			currentValue += val
		}
	}

	fmt.Println(largestValue)
	fileScanner.Close()
}
