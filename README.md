## 搜索算法

在千万级数据的文件进行搜索到需要的数据 (Node.js)。

参考至： [https://github.com/DeronLee/PracticeForProgrammingPearls/tree/master/SearchingAlgorithm/SpeechDoc](https://github.com/DeronLee/PracticeForProgrammingPearls/tree/master/SearchingAlgorithm/SpeechDoc) 


## 说明

大体步骤：
 
1. 对无序数据进行排序
2. 对有序文件进行搜索，二分法


文件：

- `input_file_large.txt` 是原文件。
- `sort_data.js` 中的程序实现了对大文件进行排序。


## 运行

排序：

```
$ node sort_data.js
将大文件拆分为八个小文件: 25041.691ms
排序0: 40624.006ms
写文件0: 2334.398ms
排序1: 39540.444ms
写文件1: 2573.088ms
排序2: 42552.704ms
写文件2: 2394.856ms
排序3: 38366.092ms
写文件3: 2530.128ms
排序4: 41338.223ms
写文件4: 2391.502ms
排序5: 36246.398ms
写文件5: 2292.791ms
排序6: 38040.837ms
写文件6: 1901.534ms
排序7: 36147.288ms
写文件7: 1878.335ms
将数据写入 result file: 331160.024ms
```


## TODO

- [] 搜索
- [] 数据量提升至亿级