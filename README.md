![buha.js](https://github.com/flouthoc/buha.js/blob/master/buha.png)
# buha.js
Browser based <b>Strictly ordered</b> Task Queue for <b>Sync/Async</b> Javascript Functions. https://flouthoc.github.io/buha.js/

## Usage

Both <b>Sync/Async</b> Jobs can be submitted to buhaRunner with simple push function

```javascript
const buhaRunner = buha();
buhaRunner.push(job1);
buhaRunner.push(job2);
```

Async Function with Callback example
```javascript
const exampletask = async (callback) => {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves (*)

  alert(result); // "done!"
  callback();
}

const buhaRunner = buha();
buhaRunner(exampletask);
```
<b>Sync</b> Function with Callback as argument to push not to function itself.
```js
const buhaRunner = buha();
buhaRunner(()=>{console.log("hello"), ()=>{console.log("Quick Callback"}, true);
```

## Docs

### .push(job, callback, isSync)

* Job : main job function
* Callback: callback if not specifed in function itself
* isSync: must be true if function is Synchronus.

### Contributors
```add your name here```

### Leagal
Any Images or artwork used in this project are part of freepik.


