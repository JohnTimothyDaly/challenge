import { cachedDataVersionTag } from "v8";

const path = require('path');
const fs = require('fs').promises;
const buffer = require('buffer');
//const crypto = require('crypto');

console.log("Here we go!");

async function get_alt_data() {
    const altDataFile = path.resolve('../clear_smaller.txt');
    const altData = await fs.readFile(altDataFile);

    return altData.toString();
}

async function aufgabe_1() {
    console.log('\n\n Aufgabe 1.');

    const secretFilePath = path.resolve('../secret.enc');
    const secretFile = await fs.readFile(secretFilePath);
    const keyFilePath = path.resolve('../secret.key');
    const keyFile = await fs.readFile(keyFilePath);
    const algorithm = 'aes-256-gcm';

    return '';
}

function is_num(pot_num) {
    const num = parseInt(pot_num)
    if (Number.isNaN(num)) {
        return false;
    } else {
        if (num.toString() === pot_num) {
            return true;
        } else {
            return false;
        }
    }
}

function get_nums_for_string(data) {
    const nums: Array<number> = [];
    for (const char of data) {
        if (is_num(char)) {
            const num = parseInt(char)
            nums.push(num);
        }
    }

    return nums;
}

function get_sum(data) {
    const nums = get_nums_for_string(data);
    if (nums.length === 0) {
        return 0;
    }
    const sum = nums.reduce((a, b) => a + b);

    return sum;
}

function aufgabe_2(data) {
    console.log('\n\n Aufgabe 2.');

    const sum = get_sum(data);
    console.log(`Die Summe aller vorkommenden Ziffer ist ${sum}`);

    return sum;
}

function aufgabe_3(data, sum) {
    console.log('\n\n Aufgabe 1.');

    const a_worth = 2;
    let a_count = 0;

    const e_worth = 4;
    let e_count = 0;

    const i_worth = 8;
    let i_count = 0;

    const o_worth = 16;
    let o_count = 0;

    const u_worth = 32;
    let u_count = 0;

    for (const char of data) {
        if (char === 'a' || char === 'A') {
            a_count += 1;
        } else if (char === 'e' || char === 'E') {
            e_count += 1;
        } else if (char === 'i' || char === 'I') {
            i_count += 1;
        } else if (char === 'o' || char === 'O') {
            o_count += 1;
        } else if (char === 'u' || char === 'U') {
            u_count += 1;
        }
    }

    const a_sum = a_count * a_worth;
    const e_sum = e_count * e_worth;
    const i_sum = i_count * i_worth;
    const o_sum = o_count * o_worth;
    const u_sum = u_count * u_worth;

    const voc_plus_num_sum = a_sum + e_sum + i_sum + o_sum + u_sum + sum;

    console.log(`Die Summe aller vorkommenden Ziffer (${sum}) +`);
    console.log('die Summe aller Vokalle mit der Wertigkeit ');
    console.log(`a = 2  (* ${a_count} = ${a_sum})`);
    console.log(`e = 4  (* ${e_count} = ${e_sum})`);
    console.log(`i = 8  (* ${i_count} = ${i_sum})`);
    console.log(`o = 16 (* ${o_count} = ${o_sum})`);
    console.log(`u = 32 (* ${u_sum} = ${u_sum})`);
    console.log(`ist ${voc_plus_num_sum}`);
}

function get_sentences(data: string[]) {
    let work_data: string[] = data;
    const seperators: string[] = ['.', '!', '?'];
    const i_count = seperators.length;

    for (let i = 0; i < i_count; i++) {
        const seperator: string = seperators[i];
        let tmp_parts: string[] = []
        for (const part of work_data) {
            let parts: string[] = part.split(seperator);
            parts = parts.filter(p => p !== '').map(p => p.trim());
            tmp_parts = [...tmp_parts, ...parts]
        }

        work_data = tmp_parts;
    }

    return work_data;
}

function get_first_n(num, sums: number[]) {
    const sums_dup = sums.slice();
    const sums_sort = sums_dup.sort((a, b) => a-b).reverse();

    return sums_sort.slice(0, num);
}

function get_first_n_in_order(first_n, sums) {
    let inc_sums = first_n;
    const sums_in_order: number[] = [];
    for (const sum of sums) {
        if (inc_sums.includes(sum)) {
            sums_in_order.push(sum);
            inc_sums = inc_sums.filter(num => num !== sum);
        }
    }

    return sums_in_order;
}

function aufgabe_4_a(sentences) {
    console.log('\n\n\t Section a.');

    const sums: number[] = []

    for (const sentence of sentences) {
        const sum = get_sum(sentence);
        sums.push(sum);
    }

    const first_10 = get_first_n(10, sums);
    const first_three = get_first_n(3, first_10);
    console.log('gefundene Summen: ')
    console.log(JSON.stringify(first_10));
    console.log('größte 3 Werte: ');
    console.log(JSON.stringify(first_three));
    let sums_in_order: number[] = get_first_n_in_order(first_three, first_10);
    console.log('größte 3 Werte in der Reihenfolge ihres Vorkommens: ');
    console.log(JSON.stringify(sums_in_order));

    const sums_in_order_min_i: number[] = [];
    for (let i = 0; i < 3; i++) {
        const sum = sums_in_order[i];
        sums_in_order_min_i.push(sum - i);
    }

    console.log('größte 3 Werte in der Reihenfolge ihres Vorkommens abzüglich Index: ');
    console.log(JSON.stringify(sums_in_order_min_i));

    return first_10;
}

function aufgabe_4_b(sums) {
    console.log('\n\n\t Section b.');

    const chars: string[] = []
    for (const sum of sums) {
        const char = String.fromCharCode(sum);
        chars.push(char);
    }
    const solution = chars.join('');

    console.log(`Lösungswort fuer ${sums} ist ${solution}`);
}

//function aufgabe_4_c(data) {
//    console.log('\n\n\t Section c.');
//}

function aufgabe_4(data) {
    console.log('\n\n Aufgabe 4.');

    const sentences: Array<string> = get_sentences([data]);
    const first_10 = aufgabe_4_a(sentences);
    aufgabe_4_b(first_10);
}

(async function () {
    const data = await get_alt_data();
    //const data = await aufgabe_1();
    const num_sum = aufgabe_2(data);
    aufgabe_3(data, num_sum);
    await aufgabe_4(data);
})()