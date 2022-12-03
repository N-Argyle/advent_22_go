package main

import (
	"bufio"
	"io"
	"os"
	"strings"
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
	chars := map[string]int{
		"a": 1,
		"b": 2,
		"c": 3,
		"d": 4,
		"e": 5,
		"f": 6,
		"g": 7,
		"h": 8,
		"i": 9,
		"j": 10,
		"k": 11,
		"l": 12,
		"m": 13,
		"n": 14,
		"o": 15,
		"p": 16,
		"q": 17,
		"r": 18,
		"s": 19,
		"t": 20,
		"u": 21,
		"v": 22,
		"w": 23,
		"x": 24,
		"y": 25,
		"z": 26,
		"A": 27,
		"B": 28,
		"C": 29,
		"D": 30,
		"E": 31,
		"F": 32,
		"G": 33,
		"H": 34,
		"I": 35,
		"J": 36,
		"K": 37,
		"L": 38,
		"M": 39,
		"N": 40,
		"O": 41,
		"P": 42,
		"Q": 43,
		"R": 44,
		"S": 45,
		"T": 46,
		"U": 47,
		"V": 48,
		"W": 49,
		"X": 50,
		"Y": 51,
		"Z": 52,
	}
	fileScanner := createScanner(file)
	score := 0
	for fileScanner.Scan() {
		hasComplete := false
		str := fileScanner.Text()
		str1 := str[0 : len(str)/2]
		str2 := str[len(str)/2 : len(str)]
		for _, s := range str1 {
			if strings.Contains(str2, string(s)) && !hasComplete {
				score = score + chars[string(s)]
				hasComplete = true
			}
		}
	}
	println(score)
}

func main() {
	part1()
}
