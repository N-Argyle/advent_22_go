package main

import (
	"bufio"
	"io"
	"os"
	"regexp"
	"strconv"
)

// create map of all letters in alphabet corresponding to numbers
// get shared number for each line and add to sum

var file string = "input.txt"

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
	fileScanner := createScanner(file)
	fileScanner2 := createScanner(file)
	score := 0
	numLines := 0
	for fileScanner.Scan() {
		numLines++
	}
	lines := make([][]int, numLines)
	counter := 0
	for fileScanner2.Scan() {
		zp := regexp.MustCompile(`\,|-`)
		strSlice := zp.Split(fileScanner2.Text(), -1)
		val0, err := strconv.Atoi(strSlice[0])
		val1, err := strconv.Atoi(strSlice[1])
		val2, err := strconv.Atoi(strSlice[2])
		val3, err := strconv.Atoi(strSlice[3])
		check(err)
		lines[counter] = make([]int, 4)
		lines[counter][0] = val0
		lines[counter][1] = val1
		lines[counter][2] = val2
		lines[counter][3] = val3
		counter++
	}
	for i := 0; i < numLines; i++ {
		AA := lines[i][0]
		AB := lines[i][1]
		BA := lines[i][2]
		BB := lines[i][3]
		if (AA <= BA && AB >= BB) || (BA <= AA && BB >= AB) {
			score++
		}
	}
	println(score)
}

func part2() {
	fileScanner := createScanner(file)
	fileScanner2 := createScanner(file)
	score := 0
	numLines := 0
	for fileScanner.Scan() {
		numLines++
	}
	lines := make([][]int, numLines)
	counter := 0
	for fileScanner2.Scan() {
		zp := regexp.MustCompile(`\,|-`)
		strSlice := zp.Split(fileScanner2.Text(), -1)
		val0, err := strconv.Atoi(strSlice[0])
		val1, err := strconv.Atoi(strSlice[1])
		val2, err := strconv.Atoi(strSlice[2])
		val3, err := strconv.Atoi(strSlice[3])
		check(err)
		lines[counter] = make([]int, 4)
		lines[counter][0] = val0
		lines[counter][1] = val1
		lines[counter][2] = val2
		lines[counter][3] = val3
		counter++
	}
	for i := 0; i < numLines; i++ {
		AA := lines[i][0]
		AB := lines[i][1]
		BA := lines[i][2]
		BB := lines[i][3]
		if (BA <= AB && BA >= AA) ||
			(BB <= AB && BB >= AA) ||
			(AB <= BB && AB >= BA) ||
			(AA >= BA && AA <= BB) {
			score++
		}
	}
	println(score)
}

func main() {
	part1()
	part2()
}
