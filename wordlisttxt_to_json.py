import sys
import json

def convert(input_filename, output_filename):
    result = {}
    f = open(input_filename, "r")
    try:
        for l in f:
            l = l.strip()
            parts = l.split("\t")
            result[int(parts[0])] = parts[1]
    finally:
        f.close()

    if len(result) > 0:
        f = open(output_filename, "w")
        try:        
            f.write(json.dumps(result))
        finally:
            f.close()

def main():
    if len(sys.argv) < 3:
        print "ERROR: Missing input and output files"
        print "Usage:"
        print "wordlisttxt_to_json.py INPUT_FILE OUTPUT_FILE"
        print ""
        sys.exit(2)

    input_filename = sys.argv[1]
    output_filename = sys.argv[2]

    convert(input_filename, output_filename)

if __name__ == "__main__":
    main()
