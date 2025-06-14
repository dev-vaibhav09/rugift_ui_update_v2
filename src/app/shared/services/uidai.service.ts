import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})


export class UidaiService {
    public d: any;
    public p: any;

    constructor() {
        this.d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        ];

        // permutation table p
        this.p = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
        ];
    }

    // validates checksum
    validate(array: any) {
        let c = 0;
        const invertedArray = this.invArray(array);
        const has_only_numbers = !invertedArray.some(isNaN);
        if (!has_only_numbers) {
            return false;
        } else {
            for (let i = 0; i < invertedArray.length; i++) {
                c = this.d[c][this.p[(i % 8)][invertedArray[i]]];
            }
            return (c === 0);
        }
    }

    // converts string or number to an array and inverts it
    invArray(array: any) {
        if (Object.prototype.toString.call(array) === "[object Number]") {
            array = String(array);
        }

        if (Object.prototype.toString.call(array) === "[object String]") {
            array = array.split("").map(Number);
        }
        return array.reverse();
    }

    isValidUidaiNumber(aadhaar_no: string) {
      const sanitizedAadhaarNo:string = aadhaar_no.replace(/\D/g, '');

        if (sanitizedAadhaarNo.length != 12 || sanitizedAadhaarNo.startsWith('0') || sanitizedAadhaarNo.startsWith('1')) {
            return false;
        }
        return this.validate(sanitizedAadhaarNo);
    }
}
