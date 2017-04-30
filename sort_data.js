const fs = require('fs');
const readline = require('readline');
const os = require('os');


/**
 * 定义每次读取文件的大小 （10万／100万行）
 * 定义循环，用来不间断读取文件
 * 调用write_temp_file方法，将读取的内容传入
 * 如果读取出来的内容为空，中断循环
 */
function write_temp_file() {
  return new Promise((resolve, reject) => {
    let i = 0; // 当前读取的行数
    const tempFileLineSize = 1000000; // 100w
    const maxNumber =  4375000000; // 6个0
    const rl = readline.createInterface({
      input: fs.createReadStream('./input_file_large.txt'),
    });

    console.time('将大文件拆分为八个小文件');
    const tempArr = [];
    tempArr[0] = [];
    tempArr[1] = [];
    tempArr[2] = [];
    tempArr[3] = [];
    tempArr[4] = [];
    tempArr[5] = [];
    tempArr[6] = [];
    tempArr[7] = [];
    // 读取文件
    rl.on('line', (line) => {
      i++;
      // console.log('line: ', line); // 当前行的内容
      const lineNumber = parseInt(line.split(',')[0]); // 当前行的号码

      if (lineNumber > 0 && lineNumber <= (maxNumber / 8)) {
        tempArr[0].push(line);
      } else if (lineNumber > (maxNumber / 8) && lineNumber <= ( 2 * maxNumber / 8)) {
        tempArr[1].push(line);
      } else if (lineNumber > (2 * maxNumber / 8) && lineNumber <= ( 3 * maxNumber / 8)) {
        tempArr[2].push(line);
      } else if (lineNumber > (3 * maxNumber / 8) && lineNumber <= ( 4 * maxNumber / 8)) {
        tempArr[3].push(line);
      } else if (lineNumber > (4 * maxNumber / 8) && lineNumber <= ( 5 * maxNumber / 8)) {
        tempArr[4].push(line);
      } else if (lineNumber > (5 * maxNumber / 8) && lineNumber <= ( 6 * maxNumber / 8)) {
        tempArr[5].push(line);
      } else if (lineNumber > (6 * maxNumber / 8) && lineNumber <= ( 7 * maxNumber / 8)) {
        tempArr[6].push(line);
      } else if (lineNumber > (7 * maxNumber / 8) && lineNumber <= ( 8 * maxNumber / 8)) {
        tempArr[7].push(line);
      }

      if (i % tempFileLineSize === 0) {
        tempArr.map((item, index) => {
          let tempData = '';
          item.map((data) => {
            tempData += data + '\n';
          });
          fs.writeFileSync(`temp/tempFile${index}.txt`, tempData, { flag: 'a' });
          tempArr[index] = [];
        });
      }
    });

    rl.on('close', () => {
      console.timeEnd('将大文件拆分为八个小文件');
      resolve('将大文件拆分为八个小文件完毕');
    });
  });
}


/**
 * 读取temp文件 排序
 */
function write_to_result_file() {
  return new Promise((resolve, reject) => {
    console.time('将数据写入 result file');
    for (let i = 0; i < 8; i++) {
      console.time(`排序${i}`);

      const dataString = fs.readFileSync(`./temp/tempFile${i}.txt`, 'utf8');
      const resultArr = dataString.split('\n');
      const res = quickSort(resultArr);
      console.timeEnd(`排序${i}`);
      console.time(`写文件${i}`);
      let resData = '';
      res.map((item) => {
        resData += item + '\n';
      });
      fs.writeFileSync('result_file.txt', resData, { flag: 'a' });
      console.timeEnd(`写文件${i}`);
    }

    resolve('读取temp文件并排序完毕');
    console.timeEnd('将数据写入 result file');
  });
}


/**
 * 快速排序
 * @param {Array} arr 需要排序的数组
 * @return {Array} 排序完毕的数组
 */
const quickSort = function(arr) {
  if (arr.length <= 1) { return arr; }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++){
    if (arr[i].split(',')[0] < pivot.split(',')[0]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};


/**
 * 主函数
 * @return {Promise.<void>}
 */
async function main() {
  try {
    await write_temp_file();
    await write_to_result_file();
  } catch (e) {
    console.log('e: ', e);
  }
}


// 调用主函数
main();
