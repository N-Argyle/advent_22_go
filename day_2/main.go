package main

import (
	"bufio"
	"io"
	"os"
)

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
	score := 0
	scoreMap := map[string]int{
		"A": 1,
		"B": 2,
		"C": 3,
		"X": 1,
		"Y": 2,
		"Z": 3,
	}

	fileScanner := createScanner(file)

	for fileScanner.Scan() {
		elf := scoreMap[fileScanner.Text()[0:1]]
		mine := scoreMap[fileScanner.Text()[2:3]]
		score += mine
		if mine == elf {
			score += 3
		}
		if mine > elf {
			score += 6
		}
		println(mine)
	}
	println(score)
	fileScanner.Close()
}

func main() {
	part1()
}
