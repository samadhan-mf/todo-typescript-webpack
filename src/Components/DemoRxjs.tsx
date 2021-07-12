import React, { useState } from "react";
import { useEffect } from "react";
import {
  Observable,
  timer,
  concat,
  range,
  Subject,
  interval,
  of,
  from,
  throwError,
  fromEvent,
} from "rxjs";
import Rx from 'rxjs';
import { debounceTime, combineLatestAll,map,last, catchError, take,takeLast,takeUntil,takeWhile,skip,groupBy,mergeMap,reduce, bufferTime,bufferCount } from "rxjs/operators";

interface IUser {
  value: any;
}


const Rxjsdemo = () => {


// Observable with create , hooks , try catch , observer methods
  const [value, setValue] = useState<IUser[]>();
  var observable = Observable.create((observer: any) => {
    try {
      observer.next("Hey guys!");
      observer.next("Hi!");
      setTimeout(() => {
        observer.next("I am good");
      }, 2000);
    } catch (err) {
      observer.error(err);
    }
  });
  useEffect(() => {
    var observer = observable.subscribe(
      (x: any) => addItem(x),
      (error: any) => console.error("Observer got an error: " + error),
      () => console.error("Completed ")
    );
    return () => {
      observer.unsubscribe();
    };
  }, []);
  function addItem(x: any) {
    console.log(x);
    setValue(x);
  }

//Subject
  const subject = new Subject<number[]>();
  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`),
  });
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
  useEffect(() => {
    subject.next([1, 2, 3, 4, 5]);
  }, []);

// Interval operator
  const [IntValue, setIntValue] = useState<number>();
  const source = interval(2000);
  useEffect(() => {
    const subscribe = source.subscribe((val) => setIntValue(val));
    return () => {
      subscribe.unsubscribe();
    };
  }, []);

// concat operator
  const [concatValue, setconcatValue] = useState<number>();
  const timer = interval(1000).pipe(take(4));
  const sequence = range(1, 10);
  const result = concat(timer, sequence);
  useEffect(() => {
    const uns = result.subscribe((val) => setconcatValue(val));
    return () => {
      uns.unsubscribe();
    };
  }, []);

// take ,takelast , takeuntil , takewhile , skip
const [takeValue, settakeValue] = useState<number>();
const [takeLastValue, settakeLastValue] = useState<number>();
const [takeUntilValue, settakeUntilValue] = useState<number>();
const [takeWhileValue, settakeWhileValue] = useState<number>();
const [skipValue, setskipValue] = useState<number>();

const intervalCount = interval(1000);
const many = range(1, 100);
const clicks = fromEvent(document, 'click');
const takeFive = intervalCount.pipe(take(5));
const takeLastOne = intervalCount.pipe(takeLast(1));
const takeUntilRes = intervalCount.pipe(takeUntil(clicks));
const takeWhileRes = intervalCount.pipe(takeWhile(ev => ev < 5));
const skipRes = intervalCount.pipe(skip(5));
takeFive.pipe(last()).subscribe(val => console.log(`Last alphabet: ${val}`));
useEffect(() => {
  const takedemo = takeFive.subscribe((val) => settakeValue(val));
  const takelastdemo = takeLastOne.subscribe((val) => settakeLastValue(val));
  const takeuntildemo = takeUntilRes.subscribe((val) => settakeUntilValue(val));
  const takewhiledemo = takeWhileRes.subscribe((val) => settakeWhileValue(val));
  const skipdemo = skipRes.subscribe((val) => setskipValue(val));
  return () => {
    takedemo.unsubscribe();
    takelastdemo.unsubscribe();
    takeuntildemo.unsubscribe();
    takewhiledemo.unsubscribe();
    skipdemo.unsubscribe();    
  };
}, []);

//groupBy , mergeMap , reduce
const group = from([
  {id: 1, name: 'JavaScript'},{id: 1, name: 'Parcel'},{id: 1, name: 'webpack'},
  {id: 1, name: 'TypeScript'},{id: 1, name: 'TSLint'}])
  const subGroup = group.pipe(
  groupBy(p => p.id),
  mergeMap((groups) => groups.pipe(reduce((acc:any, cur) => 
  [...acc, cur], []))),
  // [...acc,cur],[`${groups.key}`]))),
  // combineLatestAll()
  // map(arr => ({ id: parseInt(arr[0], 10), values: arr.slice(1) })),
  )

useEffect(() => {
const subGroupRes =  subGroup.subscribe(p => console.log(p));
  return () => {
    subGroupRes.unsubscribe();
  };
}, []);

  return (
    <>
      <div>Rxjs dmeo</div>
      <div>observer with setTimeout - {value}</div>
      <div>Interval (2000) operator - {IntValue}</div>
      <div>Concat operator - {concatValue}</div>
      <div>Take (total count 5 - from 0) operator - {takeValue}</div>
      <div>TakeLast (total count 2 - from 0) operator - {takeValue}</div>
      <div>TakeUntil (stops count when we click on screen) operator - {takeUntilValue}</div>
      <div>TakeWhile (stops reaching 4 - val less than 5) operator - {takeWhileValue}</div>
      <div>skip (skip first 5 count) operator - {skipValue}</div>
      {/* <div>groupBy operator - {groupValue}</div> */}
      
    </>
  );
};

export default Rxjsdemo;
